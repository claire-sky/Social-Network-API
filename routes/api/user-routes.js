const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up GET one, PUT, DELETE, and POST friend at /api/users/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
    .post(addFriend);

// Set up DELETE friend at /api/users/:userId/:friendId
router
    .route('/:userId/:friendId')
    .delete(deleteFriend);

module.exports = router;