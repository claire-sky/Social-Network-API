const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// Set up POST at /api/comments/:id
router
    .route('/:userId')
    .get(getAllThoughts)
    .post(addThought);
    
// Set up POST and DELETE at /api/thoughts/:userId/:thoughtId
router
  .route('/:userId/:thoughtId')
  .get(getThoughtById)
  .put(addReaction)
  .delete(removeThought);

// Set up POST and DELETE at /api/thoughts/:userId/:thoughtId/:reactionId
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;
