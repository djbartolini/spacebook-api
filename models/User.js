const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

const userSchema = new Schema(
  {
  username: {
    type: String,
    required: true,
    max_length: 20,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
      },
      message: p => `${p} is not a valid email!`
    },
  },
  thoughts: [thoughtSchema],
  // friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
},
{
  toJSON: {
    getters: true,
  },
  id: false,
}
)

// userSchema.virtual('friendCount').get(function () {
//   return this.friends.length;
// });

const User = model('user', userSchema);

module.exports = User;
