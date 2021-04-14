// This project is adapted directly from the source code for
// UA web developer bootcamp Module 18, and is subject to 
// that program's copyright and licensing


const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');


// /api/users 
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/users/:id  
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/friendId')
  .post(addFriend)
  .delete(removeFriend);


module.exports = router;
