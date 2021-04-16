// This project is adapted directly from the source code for
// UA web developer bootcamp Module 18, and is subject to 
// that program's copyright and licensing


const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');


// * /api/users 
// user-controller functions:
//  (U1) get all users
//  (U2) create a new user 
router
  .route('/')
  .get(getAllUsers)
  .post(addUser);

// * /api/users/<userId> 
// user-controller functions:
// (U3)	getUserById: GET single user by id 
//       and populate thought and friend data
// (U4)	updateUser : PUT to update user by id
// (U5)	deleteUser:  DELETE to remove user by id 
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// * api/users/<userId>/friends/<friendId>
//    user-controller functions:
// (U6) Add new friend to a user's friend list
// (U7)	Remove friend from a user's friend list
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);


module.exports = router;
