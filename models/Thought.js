const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const userSchema = require('./User');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
)

thoughtSchema.methods.getTimestamp = function () {
  return this.createdAt.toLocaleDateString('en-US');
};

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
