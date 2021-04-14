// This project is adapted directly from the source code for
// UA web developer bootcamp Module 18, and is subject to 
// that program's copyright and licensing

const router = require('express').Router();
const {
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts ROUTES
// Done:
// TBD:
// (T1)	GET to get all thoughts
// (T2)	GET to get a single thought by its _id
// (T3)	POST to create a new thought 
//(don't forget to push the created thought's _id to the 
// associated user's thoughts array field)
// SAMPLE data: {
//   "thoughtText": "Here's a cool thought...",
//   "username": "vloebel",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// (T4) PUT to update a thought by  _id
// (T5)	DELETE to remove a thought by  _id


// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThought,
    );


//REACTION ROUTES
// /api/thoughts/:thoughtId/reactions
// (R1)	POST to create a reaction stored in a single thought's reactions array field
// (R2)	DELETE to pull and remove a reaction by the reaction's reactionId value


// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
