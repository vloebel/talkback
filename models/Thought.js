const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      maxlength: 280,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    userName: {
      type: String,
      required: true,
    },

  reactons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reaction'
    }
  ]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of friends on retrieval
UserSchema.virtual('reactionCount').get(function() {
  return this.reactions.length + 1;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
