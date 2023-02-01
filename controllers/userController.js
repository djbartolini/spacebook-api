const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No users with provided ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },
  // Create user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No users with provided ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No users with provided ID' })
          : Thought.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { username: req.params.username } },
            { new: true }
          )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'User deleted, no Thoughts found from this user' })
          : res.json({ message: 'User and Thoughts successfully deleted' })
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json(err);
      }
      )
  }
};