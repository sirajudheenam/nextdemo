// 'use client';


// const mongoose = require('mongoose');
// const axios = require('axios');
// const User = require('./models/user');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/sampleDB');

// // Define User Schema
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true },
//     imageURL: String,
// });

// // Define User Model
// const User = mongoose.model('User', userSchema);

// // Function to fetch random images from Unsplash
// async function fetchRandomImages(count) {
//     const response = await axios.get(`https://source.unsplash.com/random/${count}`);
//     return response.data.map(image => image.urls.small);
// }

// // Function to generate random user data
// async function generateRandomUsers(count) {
//     const randomImages = await fetchRandomImages(count);

//     const users = [];
//     for (let i = 0; i < count; i++) {
//         const user = {
//             name: `User ${i + 1}`,
//             email: `user${i + 1}@example.com`,
//             imageURL: randomImages[i],
//         };
//         users.push(user);
//     }
//     return users;
// }

// // Function to insert users into MongoDB
// async function insertUsers(users) {
//     try {
//         const insertedUsers = await User.insertMany(users);
//         console.log(`${insertedUsers.length} users inserted successfully.`);
//     } catch (error) {
//         console.error('Error inserting users:', error);
//     }
// }

// // Main function to generate and insert users
// async function main() {
//     const numberOfUsers = 25;
//     const users = await generateRandomUsers(numberOfUsers);
//     await insertUsers(users);
//     mongoose.disconnect();
// }

// // Execute main function
// main();
