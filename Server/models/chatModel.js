const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Kisne bheja
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Kisko bheja
    message: { type: String, required: true },  // Kya Message bheja
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
