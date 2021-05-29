require("dotenv").config();

/**
 * Set up rest server and enviroment variables
 *
 */
const Server = require("./models/server");

const server = new Server();
server.listen();
