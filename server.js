const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/thoughts', require('./routes/thoughts'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
