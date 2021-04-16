// This project is adapted directly from the source code for
// UA web developer bootcamp Module 18, and is subject to 
// that program's copyright and licensing

const { User } = require('../models');

// * /api/users 
// (U1) getAllUsers
//   GET /api/users
// (U2) addUser: 
//   POST /api/users
//   BODY FORMAT {
//     "username": "vloebel", 
//     "email": "vloebel@hotmail.com" }
//
// * /api/users/<userId> 
// (U3)	getUserById: GET single user by id 
//       and populate thought and friend data
// (U4)	updateUser : PUT to update user by id
// (U5)	deleteUser:  DELETE  user by id
//
// TBD: (bonus) Remove a user's associated thoughts on delete
//
// * api/users/<userId>/friends/<friendId>
// (U6) addFriend: POST new friend to user's friend list
// (U7)	removeFriend: DELETE friend from a user's friend list
//      DELETE api/users/<userId>/friends/<friendId>

const userController = {

  // (U1) getAllUsers
  //   GET /api/users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // (U2) addUser: 
  //   POST /api/users
  //   BODY FORMAT {
  //     "username": "vloebel", 
  //     "email": "vloebel@hotmail.com" }
  addUser({ body }, res) {
    User.create(body)
      .then(dbData => res.json(dbData))
      .catch(err => res.json(err));
  },

  // (U3)	getUserById
  //   GET /api/users/<userId>
  //   and populate thought and friend data

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
      .then(dbData => {
        if (!dbData) {
          res.status(404)
            .json({ message: `No user found with id: ${params.id}` });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // (U4)	updateUser by userId
  //  PUT /api/users/<userId> 
  // { "username": "vloebel", "email": "vloebel@hotmail.com" }

  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id }, body,
      { new: true, runValidators: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: `No user found with id: ${params.id}` });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },

  // (U5)	deleteUser by userId
  //  DELETE /api/users/<userId> 
  deleteUser({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbData => {
        console.log('dbData ' + dbData);
        // if this user has thoughts
        // delete the thoughts whose _id is in the array
        if (dbData.thoughts && dbData.thoughts.length >= 1) {
          const delStatus = await Thought.deleteMany({ _id: { $in: dbData.thoughts } });
          console.log('delStatus ' + delStatus);
        }
        console.log ('Second dbData ' + dbData);
        return (dbData);

      })
      // then delete the user
    .then (dbData => {
    
    User.findOneAndDelete(dbData._id)
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: `No user found with id: ${dbData._id}` });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
})
},


  // * FRIENDS

  // (U6) Add new friend to a user's friend list
  //  POST api/users/<userId>/friends/<friendId>
  addFriend({ params }, res) {
    console.log(`addFriend params: ${params}`);

    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404)
            .json({ message: `No user found with id: ${params.id}` });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },


  // (U7)	Remove friend from a user's friend list
  //  DELETE api/users/<userId>/friends/<friendId>

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: `No user found with id: ${params.id}` });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },
}

module.exports = userController;
