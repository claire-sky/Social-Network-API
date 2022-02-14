const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// Set up GET at /api/thoughts/
router
    .route('/')
    .get(getAllThoughts)

// Set up POST at /api/thoughts/:userId
router
    .route('/:userId')
    .post(addThought);
    
// Set up GET, POST and DELETE at /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(addReaction)
    .delete(removeThought);

// Set up DELETE at /api/thoughts/:userId/:thoughtId/:reactionId
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;
