const { Router } = require("express");
const {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPut,
  usuariosPost,
} = require("../controllers/user");
const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post("/", usuariosPost);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
