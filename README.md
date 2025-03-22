# Task-1 - REAL-TIME-CHAT-APPICATION

**COMPANY:** CODTECH IT SOLUTIONS  

**NAME:** VISHAL MALVIYA  

**INTERN ID:** CT04WY75  

**DOMAIN:** MERN STACK DEVELOPER  

**DURATION:** 4 WEEKS  

**MENTOR:** NEELA SANTOSH  

---

### **Overview**

This project is a real-time chat application inspired by WhatsApp, built using the MERN stack (MongoDB, Express, React, Node.js) with WebSocket (Socket.io) for live messaging. The UI is designed with Tailwind CSS, providing a modern and responsive interface. JWT authentication is implemented for secure user registration and login.

---

### **Tools & Technologies Used**

#### **Backend:**

- **Node.js & Express.js** - Handles server-side logic and authentication.
- **Socket.io** - Enables real-time, bidirectional communication between clients and the server.
- **MongoDB & Mongoose** - Stores user details and chat history.
- **JWT Authentication** - Ensures secure user login.
- **Bcrypt.js** - Hashes passwords for security.

#### **Frontend:**

- **React.js (Vite)** - Provides a dynamic and efficient UI.
- **Tailwind CSS** - Enhances the design with modern styling.
- **React Hooks (useState, useEffect, useContext)** - Manages state and WebSocket interactions.

#### **Development Tools:**

- **VS Code** - Used for coding and development.
- **Git & GitHub** - For version control and project collaboration.
- **Concurrently** - Runs both backend and frontend simultaneously for smooth development.

---

### **Features**

- **User Authentication** - Secure login and registration with JWT.
- **Real-Time Messaging** - Instant communication using WebSockets.
- **Modern UI** - WhatsApp-like chat interface using Tailwind CSS.
- **User List** - Displays all registered users for easy chat selection.
- **Chat History** - Messages are stored persistently in MongoDB.
- **Responsive Design** - Works seamlessly on different devices.
- **Concurrently Integration** - Runs both backend and frontend with a single command.

---

### **Application Flow**

1. **User Registration/Login** - Users register and log in securely using JWT authentication.
2. **User List Display** - A list of registered users is displayed for chat selection.
3. **Real-Time Chat** - Messages are sent and received instantly using WebSockets.
4. **Message Storage** - Chat history is saved in MongoDB for future reference.
5. **Logout** - Users can log out securely.

---

### **Installation & Setup**

#### **Prerequisites**

Ensure you have the following installed on your system:

- Node.js (LTS version recommended)
- NPM or Yarn (For package management)

#### **Setup Instructions**

Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/your-repo/chatapp.git
cd chatapp
```

Install dependencies:

```bash
npm install
```

Start the backend and frontend together using Concurrently:

```bash
npm run dev
```

This command runs the backend using `nodemon` and the frontend using `vite` simultaneously:

```
> server@1.0.0 dev
> concurrently "nodemon index.js" "npm start --prefix ../client"

[0] [nodemon] starting `node index.js`
[1] > vite-project@0.0.0 start
[1] > vite
[1] VITE v6.2.0 ready in 1810 ms
[1] ➜ Local:   http://localhost:5173/
[0] 🚀 Server running on port 4000
```

---

### **Where This Can Be Used**

This real-time chat application can be used in various scenarios, such as:

- **Personal Messaging** - Enables secure and real-time personal conversations.
- **Team Collaboration** - Assists teams in quick and efficient communication.
- **Customer Support** - Provides real-time chat support for businesses.
- **Educational Use** - Helps students and teachers interact through live chat.

---

### **Future Enhancements**

- **Typing Indicators** - Show when a user is typing.
- **Read Receipts** - Indicate whether messages have been read.
- **Group Chats** - Enable multiple users to chat in a group.
- **Voice & Video Calls** - Add real-time voice and video communication.

---

### **Conclusion**

This WhatsApp-Style Chat App is a feature-rich, scalable, and responsive chat platform using React.js, Node.js, Express.js, MongoDB, and WebSockets. It provides a strong foundation for real-time messaging applications and can be further enhanced with additional features in the future.

---

### **License**
This project is licensed under the MIT License.





![Image](https://github.com/user-attachments/assets/8a474c40-8fdc-4aa0-aa6d-08aa6ad65607)

![Image](https://github.com/user-attachments/assets/230bae01-ed95-4e7e-b73e-b7002444866d)

![Image](https://github.com/user-attachments/assets/be1ee9d4-6081-4caf-ad7c-2b438a6ba1bb)

![Image](https://github.com/user-attachments/assets/306884b2-c83e-4daa-aa1e-6b4e52f53382)

![Image](https://github.com/user-attachments/assets/77645b88-3baa-4c8d-8eee-09fb64f26862)


