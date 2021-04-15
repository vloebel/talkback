// This project is adapted directly from the source code for
// UA web developer bootcamp Module 18, and is subject to 
// that program's copyright and licensing

const router = require('express').Router();
const {
  getAllThoughts,
  addThought,
  getThoughtById,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// * THOUGHTS
// * /api/thoughts
// Thought-controller function:
//   (T1)	GET all thoughts
router
  .route('/')
  .get(getAllThoughts);

// * /api/thoughts/<userid>
// Thought-controller function:
//   (T2) Create a new thought for a user
router.route('/:userId')
  .post(addThought)

// * /api/thoughts/<thoughtId>
// Thought-controller functions:
//   (T3)	Get a thought by its id
//   (T4) Update a thought by its id
//   (T5)	Remove a thought (by its id) 

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// * REACTIONS
// * /api/thoughts/<thoughtId>/reactions
// Thought-controller functions
//    (T6) Assign a reaction to a thought
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// * /api/thoughts/<thoughtId>/reactons/<reactionId>
// Thought-controller function:
//   (T7)	DELETE a reaction by its thought & reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
