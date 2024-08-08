const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const User = require('../models/User'); // To update user's thoughts if needed

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a thought
router.post('/', async (req, res) => {
  try {
    const newThought = new Thought(req.body);
    const thought = await newThought.save();

    // Optionally update the user's thoughts (if you want to link thought to user)
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: thought._id }
    });

    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET a single thought by ID
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a thought by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a thought by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { thoughts: req.params.id }
    });

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    thought.reactions.push(req.body);
    const updatedThought = await thought.save();
    res.status(201).json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    thought.reactions.id(req.params.reactionId).remove();
    const updatedThought = await thought.save();
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
