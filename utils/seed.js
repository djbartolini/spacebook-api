const connection = require('../config/connection');
const User = require('../models/User');
const userSeed = require('./data');

console.time('seeding. . .');

connection.once('open', async () => {
  // delete all users first
  await User.deleteMany({});

  // bring in the seed data
  const users = userSeed;

  // insert seed into database
  await User.collection.insertMany(users);

  // display pretty table with seeded database
  console.table(users);
  console.timeEnd('seeding complete!');
  // terminate this node process with exit code 0 for success
  process.exit(0);
})