# XM-SocialNetwork: A Social Media API

## Description
XM-SocialNetwork is an API designed to handle large amounts of unstructured data for social media platforms. It allows users to create, update, and delete thoughts, manage friendships, and interact through reactions to thoughts.

Version: 1.0.0  
License: MIT

### Dependencies:
- express: ^4.19.2
- mongoose: ^7.5.3
- nodemon: ^3.0.1

## Installation
To run XM-SocialNetwork locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd XM-SocialNetwork
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application:
    ```bash
    nodemon server.js
    ```
    This will start the server at `http://localhost:3001`.

## Usage
- Use Postman or another API client to interact with the API.
- The following routes are available:
  - **Users**
    - `GET /users` - Retrieve all users.
    - `POST /users` - Create a new user.
    - `PUT /users/:id` - Update a user by ID.
    - `DELETE /users/:id` - Delete a user by ID.
    - **Friends Management** - Add or remove friends for a user.

  - **Thoughts**
    - `GET /thoughts` - Retrieve all thoughts.
    - `POST /thoughts` - Create a new thought.
    - `PUT /thoughts/:id` - Update a thought by ID.
    - `DELETE /thoughts/:id` - Delete a thought by ID.
    - **Reactions Management** - Add or remove reactions to thoughts.

## Example Data
- **User Example:**
    ```json
    {
      "username": "lernantino",
      "email": "lernantino@gmail.com"
    }
    ```

- **Thought Example:**
    ```json
    {
      "thoughtText": "Here's a cool thought...",
      "username": "lernantino",
      "userId": "5edff358a0fcb779aa7b118b"
    }
    ```

## Link to the Video
https://drive.google.com/file/d/1OQX2pOQF_I_Wuq3lxse3BaZnFBZ5KdHw/view?usp=sharing

## Credits
- Author: Xavier Mendoza
- University of Toronto

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the LICENSE file for details.
