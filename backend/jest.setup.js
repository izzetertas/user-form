const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

beforeAll(async () => {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  console.log("Creating MongoMemoryServer instance!");
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();

  // Set the Mongoose connection to use the in-memory database
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongoose!");
});

afterAll(async () => {
  console.log("Disconnecting from mongoose!");
  await mongoose.disconnect();
  console.log("Stopping mongoServer!");
  await mongoServer?.stop();
});
