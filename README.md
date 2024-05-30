# FoodShareHub Server

This is the server-side application for FoodShareHub, a Community Food Sharing and Surplus Reduction Platform. The server is built using Node.js, Express, and MongoDB, and it provides RESTful API endpoints for managing food donations and user requests.

## Features

1. **RESTful API**: Provides endpoints for CRUD operations on food donations and user requests.
2. **Authentication**: Secure authentication and authorization mechanisms.
3. **Environment Variables**: Uses environment variables to manage sensitive information.
4. **CORS**: Configured to allow cross-origin requests.
5. **Deployment**: Deployed on Vercel for easy access and scalability.

## Technologies Used

- `express`
- `MongoDB Atlas`
- `dotenv`
- `cors`
`

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Porgramming-Hero-web-course/b9a11-server-side-Oishee90
    ```
2. Navigate to the project directory:
    ```bash
    cd foodsharehub-server
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add your MongoDB connection string and other necessary environment variables to the `.env` file.

## Live Demo

Check out the live demo of FoodShareHub [here](https://foodking-website.web.app).

---
## Environment Variables

Make sure to set the following environment variables in your `.env` file:

```plaintext
PORT=5001


