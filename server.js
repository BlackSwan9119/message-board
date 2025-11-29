const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://arudt_db_user:trEtFZHDRx4ck3MF@cluster0.hdnbfdk.mongodb.net/messageboard?appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.get('/', (req, res) => {
  res.send('Message Board API is running');
});

// GET all messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new message
app.post('/api/messages', async (req, res) => {
  try {
    const message = new Message({
      text: req.body.text
    });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
