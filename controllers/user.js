const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Verificar si el correo exis

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();
  res.json({ usuario });
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API - Controller",
    usuario,
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  //Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  const usuarioAutenticado = req.usuario;

  res.json({
    usuarioborrado: usuario,
    usuarioAutenticado: usuarioAutenticado,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - Controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
};
