const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

/**
 * @route   GET /api/notes
 * @desc    Get all notes for logged in user
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const { search, pinned, archived, tag } = req.query;
    
    // Build query
    const query = { user: req.user._id, deleted: false };
    
    if (pinned !== undefined) {
      query.pinned = pinned === 'true';
    }
    
    if (archived !== undefined) {
      query.archived = archived === 'true';
    }
    
    if (tag) {
      query.tags = tag;
    }
    
    // Search in title and content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const notes = await Note.find(query)
      .sort({ pinned: -1, createdAt: -1 })
      .lean();
    
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/notes/:id
 * @desc    Get single note
 * @access  Private
 */
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
      deleted: false
    });
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/notes
 * @desc    Create a new note
 * @access  Private
 */
router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const { title, content, pinned, tags, archived } = req.body;
    
    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      pinned: pinned || false,
      archived: archived || false,
      tags: tags || []
    });
    
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/notes/:id
 * @desc    Update a note
 * @access  Private
 */
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
      deleted: false
    });
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    const { title, content, pinned, archived, tags } = req.body;
    
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (pinned !== undefined) note.pinned = pinned;
    if (archived !== undefined) note.archived = archived;
    if (tags !== undefined) note.tags = tags;
    
    await note.save();
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   DELETE /api/notes/:id
 * @desc    Soft delete a note
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    note.deleted = true;
    await note.save();
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;