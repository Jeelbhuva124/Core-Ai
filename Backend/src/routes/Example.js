const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/Example');

// GET /api/Example
router.get('/', exampleController.getAll);

// GET /api/Example/:id
router.get('/:id', exampleController.getById);

// POST /api/Example
router.post('/', exampleController.create);

// PUT /api/Example/:id
router.put('/:id', exampleController.update);

// DELETE /api/Example/:id
router.delete('/:id', exampleController.remove);

module.exports = router;
