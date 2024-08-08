const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    if (user.friends.includes(req.params.friendId)) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    user.friends.push(req.params.friendId);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.friends.includes(req.params.friendId)) {
      return res.status(400).json({ error: 'Friend not in list' });
    }

    user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.friendId);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
