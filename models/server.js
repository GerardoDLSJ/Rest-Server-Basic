const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutePath = "/api/usuarios";

    //Middlewares
    this.middlewares();
    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    // .use se usa para definir los middlewares
    // cors
    this.app.use(cors());
    // Directorio public
    this.app.use(express.static("public"));
    //Lectura y parsing del body
    this.app.use(bodyParser.json());
  }

  routes() {
    this.app.use(this.usuariosRoutePath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
