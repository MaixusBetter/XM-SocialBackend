// seed.js
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path as necessary
const Thought = require('./models/Thought'); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});

// Example data to insert
const exampleUser = {
  username: 'lernantino',
  email: 'lernantino@gmail.com',
};

const exampleThought = {
  thoughtText: "Here's a cool thought...",
  username: 'lernantino',
  userId: '', // Placeholder, will be updated after user is created
};

// Seed data function
async function seed() {
  try {
    // Delete existing data (optional)
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert new user
    const user = new User(exampleUser);
    await user.save();

    // Update exampleThought with the created user's ID
    exampleThought.userId = user._id;

    // Insert new thought
    const thought = new Thought(exampleThought);
    await thought.save();

    console.log('Data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

seed();
