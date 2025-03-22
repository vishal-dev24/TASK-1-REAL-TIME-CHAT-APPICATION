const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const userModel = require('./models/users');
const chatModel = require('./models/chatModel');
const upload = require('./models/multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // 🔥 Load .env variables

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173", credentials: true } });

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const usersOnline = {}; // 🔥 Active users track करने के लिए

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret"; // 🔥 Secret key

// ✅ Registration
app.post('/register', upload.single('image'), async (req, res) => {
    const { username, email, password } = req.body;
    const imagefile = req.file ? req.file.filename : null;
    const hash = await bcrypt.hash(password, 10);
    const User = await userModel.create({ username, email, password: hash, image: imagefile });
    const token = jwt.sign({ email: email, userId: User._id }, JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.json(User);
});

// ✅ Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ email: email, userId: user._id }, JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.json(user);
});

// ✅ Middleware: isLoggedIn
function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    const { userId, email } = jwt.verify(token, JWT_SECRET);
    req.user = { _id: userId, email };
    next();
}

// ✅ Logout
app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

// ✅ Profile Route
app.get('/profile', isLoggedIn, async (req, res) => {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// ✅ All Logged-in Users
app.get('/users', isLoggedIn, async (req, res) => {
    const users = await userModel.find({ _id: { $ne: req.user._id } }, 'username image');
    const usersWithStatus = users.map(user => ({
        ...user.toObject(),
        isOnline: !!usersOnline[user._id]
    }));
    res.json(usersWithStatus);
});

// ✅ Send Message (Database + Real-time)
app.post('/message', isLoggedIn, async (req, res) => {
    const { receiver, message } = req.body;

    // Message save in database
    const chat = await chatModel.create({ sender: req.user._id, receiver, message });

    console.log("🔥 New Message Sent:", chat);

    // **Real-time Message Emit**
    if (usersOnline[receiver]) {
        console.log(`📩 Sending message to receiver: ${receiver}`);
        io.to(usersOnline[receiver]).emit("newMessage", chat);
    }
    if (usersOnline[req.user._id]) {
        console.log(`📩 Sending message to sender: ${req.user._id}`);
        io.to(usersOnline[req.user._id]).emit("newMessage", chat);
    }

    res.json(chat);
});

// ✅ Fetch Messages between Two Users
app.get('/messages/:userId', isLoggedIn, async (req, res) => {
    const messages = await chatModel.find({
        $or: [
            { sender: req.user._id, receiver: req.params.userId },
            { sender: req.params.userId, receiver: req.user._id }
        ]
    }).sort({ createdAt: 1 });
    res.json(messages);
});

// ✅ Socket.io Connection
io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // ✅ Emit Updated Online Users List
    socket.on("join", (userId) => {
        usersOnline[userId] = socket.id;
        console.log(`✅ User ${userId} joined with socket ${socket.id}`);

        // Emit updated users list to everyone
        io.emit("userOnline", Object.keys(usersOnline));
    });


    // 🔥 Send Message Event (Real-time)
    socket.on("sendMessage", async (messageData) => {
        try {
            console.log("📩 Message received from client:", messageData);
            const newMessage = await chatModel.create(messageData);

            // Emit to sender
            io.to(usersOnline[newMessage.sender]).emit("newMessage", newMessage);

            // Emit to receiver (if online)
            if (usersOnline[newMessage.receiver]) {
                console.log(`📩 Sending real-time message to receiver: ${newMessage.receiver}`);
                io.to(usersOnline[newMessage.receiver]).emit("newMessage", newMessage);
            }
        } catch (error) {
            console.error("❌ Message saving error:", error);
        }
    });

    // 🔥 User Disconnects (Also Emit Updated List)
    socket.on("disconnect", () => {
        let disconnectedUser;
        for (let userId in usersOnline) {
            if (usersOnline[userId] === socket.id) {
                disconnectedUser = userId;
                delete usersOnline[userId];
                break;
            }
        }
        if (disconnectedUser) {
            io.emit("userOnline", Object.keys(usersOnline)); // 🔥 Emit updated list
            console.log(`❌ User ${disconnectedUser} disconnected`);
        }
    });

});

// ✅ Start Server
server.listen(4000, () => { console.log("🚀 Server running on port 4000") });
