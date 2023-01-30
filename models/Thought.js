const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema({
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
})

thoughtSchema.methods.getTimestamp = function () {

}

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reatctions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
