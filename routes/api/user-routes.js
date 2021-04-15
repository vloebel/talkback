// This project is adapted directly from the source code for
// UA web developer bootcamp Module 18, and is subject to 
// that program's copyright and licensing


const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');


// /users 
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// users/<id> 
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// users/:userId/friends/:friendId
router
  .route('/:userId/friends/friendId')
  .post(addFriend)
  .delete(removeFriend);


module.exports = router;
