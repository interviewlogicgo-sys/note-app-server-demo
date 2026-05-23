const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// Create Note
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const newNote = new Note({ title, content, userId });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Error creating note' });
  }
});

// Get Notes by User
router.get('/:userId', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' });
  }
});

// Update Note
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Error updating note' });
  }
});

// Delete Note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting note' });
  }
});

module.exports = router;