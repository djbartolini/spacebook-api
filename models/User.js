const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    max_length: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  thoughts: [thoughtSchema],
  friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
