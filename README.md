# SPACEBOOK-API

[License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
Spacebook-API is an Express-driven back-end platform for a social media website that will be all about space! Space enthusisasts can come here to make posts (thoughts) about anything space-related. The app is not yet deployed, as only the MongoDB database and express routes have been setup.

## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contriuting](contributing)
  * [License](#license)
  * [Support](support)

## Installation
Installation is only available through the repository. Users who with to interact with the database can use the provided seeds. Once you clone the repo to your local machine, you must first install dependencies via the terminal command `npm i`. Then run `npm run seed` to seed the MongoDB database. Now you are ready to go! Run `npm start` to start the app. The app will run locally on Port 3001.

## Usage
The app has no front-end html yet, so the only way to interact with the database and routes is through a http request service such as Postman or Insomnia. There are the following routes:
* Users:
  - http://localhost:3001/api/users
  - http://localhost:3001/api/thoughts/{userid-goes-here}
  - http://localhost:3001/api/users/{user-id}/friends/{friend-id}
  - http://localhost:3001/api/users/{user-id}
* Thoughts:
  - http://localhost:3001/api/thoughts
  - http://localhost:3001/api/thoughts/{thought-id-goes-here}
  - http://localhost:3001/api/thoughts/{thought-id}/reactions
  - http://localhost:3001/api/thoughts/{thought-id}/reactions/{reaction-id}

# Demo
![Demo-video](./assets/Untitled_%20Feb%201%2C%202023%205_08%20PM.gif)

## Contributing
This app was made using:
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

## License
This app is covered under the MIT license: [MIT](https://opensource.org/licenses/MIT)

## Support
If you encounter problems with this README generator, please reach out to me on GitHub at: https://github.com/djbartolini, or email me at dan.barto@gmail.com