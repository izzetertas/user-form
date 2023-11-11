# Project Setup Guide

This guide will help you set up and run your project, including installing dependencies, creating a database, and running your application.

## Install Dependencies

First, install the required project dependencies using npm:

```
npm install
```

## Database Connection

Connect to the MongoDB database using one of the options outlined below:

## 1 - Custom MongoDB Connection String

In the root folder, locate the .env file.
Replace the value of MONGO_URI with your MongoDB connection string.

## 2 - Create a database with a Docker file.

### Build the MongoDB Docker Image

```
docker build -t my-mongodb .
```

### Run the MongoDB Docker Container

docker run -d -p 27017:27017 --name my-mongodb-container my-mongodb

### Stop the MongoDB Docker Container

docker stop my-mongodb-container

### Remove the MongoDB Docker Container

docker rm my-mongodb-container

## Run the application

```
npm start
```

open the browser and go to http://localhost:3000 url to test the application

## Run tests

```
npm test
```

## File structure

├── index.js # Entry point for the application
├── controllers/
│ ├── userDataController.js # Controller for handling HTTP requests
│ └── ...
├── models/
│ ├── UserData.js # Mongoose model for User Data
│ └── ...
├── repositories/
│ ├── userDataRepository.js # Repository for database operations
│ └── ...
├── routes/
│ ├── api.js # Define your API routes here
│ └── ...
├── services/
│ ├── userDataService.js # Business logic for user data
│ └── ...
├── tests/ # Test files and configurations
│ ├── unit/
│ │ ├── userDataController.test.js
│ │ └── ...
│ ├── integration/
│ │ ├── userDataService.test.js
│ │ └── ...
├── utils/ # Utility functions or modules
├── public/ # Static files (if serving static content)
├── node_modules/ # Installed npm packages
├── package.json
├── package-lock.json
├── .env # Environment variables
├── .gitignore # Git ignore rules
└── README.md # Project documentation
