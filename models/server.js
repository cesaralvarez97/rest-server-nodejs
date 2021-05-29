const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

/**
 *
 * The principal function of this class is wrap the methods and invoque them
 *
 *
 */
class Server {
  /**
   * Setup server components
   *
   */
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";
    this.repoPath = "/api/repo";
    this.authPath = "/api/auth";

    //Base de datos
    this.dbConnect();
    //Middlewares
    this.middlewares();
    //App routes
    this.routes();
  }

  /**
   * Database init
   */
  async dbConnect() {
    await dbConnection();
  }

  /**
   * Middleware init
   */
  middlewares() {
    //CORS
    this.app.use(cors());

    //Read and parse body
    this.app.use(express.json());

    //Public directory
    this.app.use(express.static("public"));
  }

  /**
   * Routes setup
   */
  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.userPath, require("../routes/user"));
    this.app.use(this.repoPath, require("../routes/repo"));
  }

  /**
   * Server listen
   */
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server working on: ${process.env.PORT}`);
    });
  }
}

module.exports = Server;
