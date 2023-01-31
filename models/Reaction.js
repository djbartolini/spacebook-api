const { Schema, model } = require('mongoose');
const userSchema = require('./User');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
      toJSON: {
        getters: true,
      },
      id: false,
  }
);

reactionSchema.methods.getTimestamp = function () {
  return this.createdAt.toLocaleDateString('en-US');
};

module.exports = reactionSchema;