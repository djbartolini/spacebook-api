const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .populate(['thoughts', 'friends'])
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
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
          : Thought.deleteMany({ userId: req.params.userId })
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
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>{
        return User.findByIdAndUpdate(
          { _id: req.params.friendId },
          { $addToSet: { friends: req.params.userId } },
          { new: true }
        )
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No users with provided ID' })
          : res.json({ message: 'Added friend!' })
      )
  },
  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    .then((user) => {
      return User.findByIdAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      )
    })
    .then((user) => 
      !user
        ? res.status(404).json({ message: 'No users with provided ID' })
        : res.json({ message: 'Friend deleted' })
    )
  }
};
