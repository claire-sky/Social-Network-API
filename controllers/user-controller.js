const { User } = require('../models');

const UserController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        },
        {
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({ id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        },
        {
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            // If no user is found
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // add friend to user
    addFriend({ params }, res) {
        User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { friends: params.friendId } },
              { new: true }
            )
            .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
    // delete friend from user
    deleteFriend({ params }, res) {
        Friend.findOneAndDelete({ _id: params.friendId })
        .then(dbFriendData => {
            if(!dbFriendData) {
                res.status(404).json({ message: 'No friend found with this id' });
                return;
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = UserController;