const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { config } = require("dotenv");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4100;
app.use("/", require("./src/modulos/citizen.js"));
app.use("/", require("./src/modulos/delitos.js"));
app.use("/", require("./src/modulos/especie.js"));
app.use("/", require("./src/modulos/gradoDelito.js"));
app.use("/", require("./src/modulos/historial.js"));
app.use("/", require("./src/modulos/roles.js"));
app.use("/", require("./src/modulos/usuario.js"));
app.listen(PORT, () => {
  console.log(`Server running in : 4100 `);
});