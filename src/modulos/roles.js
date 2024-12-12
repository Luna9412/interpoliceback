const express = require("express");
const bd = require("./bd.js");
const roles = express();
roles.get("/api/roles/listarTodosRoles", (req, res) => {
  let limite = parseInt(req.query.limite);
  let pagina = parseInt(req.query.pagina);
  let OFFSET = parseInt((pagina - 1) * limite);
  let consulta2 = "SELECT COUNT(*) AS conteoRoles FROM rol ";
  let consulta = "SELECT * FROM rol LIMIT ? OFFSET ? ";
  bd.query(consulta2, (error, totalRoles) => {
    bd.query(consulta, [limite, OFFSET], (error, roles) => {
      res.send({
        TotalRoles: totalRoles,
        roles: roles,
        error: error
      });
    });
  });
});
roles.get("/api/roles/listarRoles", (req, res) => {
  let consulta = "SELECT * FROM rol ";
  bd.query(consulta, (error, roles) => {
    if (error) {
      res.send({
        status: "Error",
        message: "Ocurrio un error en la consulta",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa !",
        roles: roles
      });
    }
  });
});
roles.get("/api/roles/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM rol WHERE idrol  = ?";
  bd.query(consulta, [id], (error, roles) => {
    if (error) {
      res.send({
        status: "Error",
        message: "Ocurrio un error en la consulta",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa !",
        roles: roles
      });
    }
  });
});
roles.post("/api/roles/crearRol", (req, res) => {
  let formDatosDeRol = {
    nombre: req.body.nombre
  };
  let consulta = "INSERT INTO rol SET ? ";
  bd.query(consulta, [formDatosDeRol], (error, roles) => {
    if (error) {
      res.send({
        status: "Error",
        message: "Ocurrio un error en la consulta",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa !",
        roles: roles
      });
    }
  });
});
roles.delete("/api/roles/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM rol WHERE idrol = ? ";
  bd.query(consulta, [id], (error, respuesta) => {
    if (error) {
      res.send({
        Status: "Error",
        Mensaje: "Ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        Status: "Ok",
        Mensaje: "Registro borrado con exito !",
        respuesta: respuesta
      });
    }
  });
});
roles.put("/api/roles/editarRolPorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosDeRol = {
    nombre: req.body.nombre
  };
  let consulta = "UPDATE rol SET ? WHERE idrol = ?";
  bd.query(consulta, [formDatosDeRol, id], (error, respuesta) => {
    if (error) {
      res.send({
        status: "Error",
        message: "Ocurrio un error en la consulta",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa !",
        respuesta: respuesta
      });
    }
  });
});
module.exports = roles;