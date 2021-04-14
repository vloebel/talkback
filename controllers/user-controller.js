// This project is adapted directly from the source code for
// UA web developer bootcamp Module 18, and is subject to 
// that program's copyright and licensing

const { User } = require('../models');


// /api/users 
// (U1) getAllUser: GET all users
// (U2) createUser: POST new user in the format:
//     {"username": "vloebel", "email": "vloebel@hotmail.com" }
// 
// /api/users/:id  

// TBD: 
// (U3)	getUserById: GET single user by  _id and populate thought and friend data
// (U4)	updateUser : PUT to update user by  _id
// (U5)	deleteUser:  DELETE to remove user by  _id
// (U6) (bonus) Remove a user's associated thoughts on delete

// /api/users/:userId/friends/:friendId

// (U7) POST add a new friend to a user's friend list
// (U8)	DELETE to remove a friend from a user's friend list
/////////////////////////////////////////
// /api/users
/////////////////////////////////////////
const userController = {

// (U1) getAllUser: GET all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  
// (U2) createUser: POST new user in the format:
//     {"username": "vloebel", "email": "vloebel@hotmail.com" }
createUser({ body }, res) {
      User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
/////////////////////////////////////////
// /api/users/:id
/////////////////////////////////////////
  // (U3)	getUserById: GET single user by  _id  
  //      and populate thought and friend data
  //  xxxx not sure about the friend array

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: `No user found with id: ${params.id}` });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = userController;
