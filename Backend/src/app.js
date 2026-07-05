const express = require('express');
const cors = require('cors');

// Import routes
// const exampleRoutes = require('./routes/Example');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
// app.use('/api/Example', exampleRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
