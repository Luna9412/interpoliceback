const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4100; // CONFIGURACION DE PUERTOS
app.use(cors());
app.use(express.json());
app.use("/", require("./src/modulos/usuario.js")); //LIBRERIA USUARIOS
app.use("/", require("./src/modulos/citizen.js")); //LIBRERIA CITIZEN
app.use("/", require("./src/modulos/especie.js")); //LIBRERIA ESPECIES
app.use("/", require("./src/modulos/roles.js")); //LIBRERIA ROLES
app.use("/", require("./src/modulos/delitos.js")); //LIBRERIA DELITOS
app.use("/", require("./src/modulos/historial.js")); //LIBRERIA HISTORIAL DE DELITOS
app.use("/", require("./src/modulos/gradoDelito.js")); //LIBRERIA GRADOS
app.listen(PORT, () => {
  console.log(`Server running in : 4100 `);
});
