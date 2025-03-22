const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase');
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: String
}, { timestamps: true }); // Ye timestamps add karega

module.exports = mongoose.model('User', userSchema);