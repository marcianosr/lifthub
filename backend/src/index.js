require("dotenv").config();
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    },
    port: 4500
  },
  a => {
    console.log(`Server started on http://localhost:${a.port}`);
  }
);
