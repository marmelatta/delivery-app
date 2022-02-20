const express = require('express');
const router = express.Router();
const Chat = require("../models/Chat");
const Message = require("../models/Message");

router.post('', async (req, res) => {
    const {authorId, receiverId} = req.body;
    
    const newChat = new Chat({
        users: [authorId, receiverId],
        createAt: Date.now(),
    });
    try {
        const chat = await newChat.save();
        res.json(chat);
    } catch (e) {
        console.error('Ошибка добавления')
    }
})

router.post('', async (req, res) => {
    const {author, text} = req.body;

    const newMessage = new Message({
        author,
        sentAt: Date.now(),
        text,
        readAt: false,
    });
    try {
        const chat = await newMessage.save();
        res.json(chat);
    } catch (e) {
        console.error('Ошибка добавления')
    }
})

module.exports = router;