const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");
const authMidd = require("../middleware/authMidd");
 

router.post(
    "/",
    authController.autenticarUsuario
);

router.get("/", authMidd, authController.usuarioAutenticado);


module.exports = router;