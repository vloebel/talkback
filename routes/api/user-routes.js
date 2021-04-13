const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

// /api/users ROUTES
// DONE:
//
// TBD: 
// (U1) GET all users
// (U2)	GET a single user by  _id and populated thought and friend data
// (U3)	POST a new user in the format:
//     {
//      "username": "vloebel",
//      "email": "vloebel@hotmail.com"
//    }
// (U4)	PUT to update a user by  _id
// (U5)	DELETE to remove user by  _id
// (U6) Remove a user's associated thoughts on delete (bonus)


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

///////////////////////////////////////////
// /api/users/:userId/friends/:friendId
// DONE:
//
// TBD: 
// (F1) POST add a new friend to a user's friend list
// (F2)	DELETE to remove a friend from a user's friend list






  

module.exports = router;
