// This project is adapted directly from the source code for
// UA web developer bootcamp Module 18, and is subject to 
// that program's copyright and licensing

const { Thought, User } = require('../models');

// * THOUGHT-CONTROLLER ROUTES:
// * /api/thoughts
// (T1)	GET: getAllThoughts 

// * /api/thoughts/<userid>
// (T2)	POST: addThought (create a new thought for a user)
//      sample body: { 
//        "thoughtText": "Let's learn MongoDB",
//        "username": "vloebel",
//        "userId": "5edff358a0fcb779aa7b118b" }

// * /api/thoughts/<thoughtId>
// (T3) GET: getThoughtById (get a single thought by its id)
// (T4) PUT: updateThought (by its id)
// (T5)	DELETE: removeThought (by its id) 

// * REACTION ROUTES
// * /api/thoughts/<thoughtId>/reactions
// (T6)	Create a reaction stored in a single 
//      thought's reactions array field
//      POST /api/thoughts/<thoughtId>/reactions

// * /api/thoughts/<thoughtId>/reactons/<reactionId>
// (T7)	DELETE a reaction by its thought & reactionId
//      DELETE /api/thoughts/reactions/<reactionId>

const thoughtController = {

  // (T1)	Get all thoughts
  //      GET /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // (T2)	Create a new thought for a user
  //      POST /api/thoughts/<userId>
  //      SAMPLE BODY { 
  //        "thoughtText": "Let's learn MongoDB",
  //        "username": "vloebel",
  //        "userId": "5edff358a0fcb779aa7b118b" }
  // 
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },

  // (T3)	Get a single thought by its _id
  //      GET /thoughts/<thoughtId>

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .select('-__v')
      .then(dbData => {
        if (!dbData) {
          res.status(404)
            .json({ message: `No thought found with id: ${params.thoughtId}` });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // (T4) updateThought (by its id)
  //      PUT /api/thoughts/<thoughtId>

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, body,
      { new: true, runValidators: true })
      .then(dbData => {
        if (!dbData) {
          res.status(404)
            .json({ message: `No thought found with id: ${params.thoughtId}` });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },

  // (T5)	Remove a specified thought from user by its _id
  //      DELETE /api/thoughts/<thoughtId>

  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(dbData => {
        if (!dbData) {
          res.status(404)
            .json({ message: `No thought to delete with id: ${params.thoughtId}` });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },

  // * /api/thoughts/<thoughtId>/reactions
  // (T6)	Create a reaction stored in a single 
  //      thought's reactions array field
  //      POST /api/thoughts/<thoughtId>/reactions

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404)
            .json({ message: `No thought found with id: ${params.thoughtId}` });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },

  // * /api/thoughts/<thoughtId>/reactons/<reactionId>
  // (T7)	DELETE a reaction by reactionId
  //      DELETE /api/thoughts/reactions/<reactionId>

  removeReaction({ params }, res) {
    console.log (`about to delete: ${params.thoughtId}`)
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404)
            .json({ message: `No thought found with id: ${params.thoughtId}` });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  }
} //thoughtController

module.exports = thoughtController;
