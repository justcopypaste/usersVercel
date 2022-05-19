const express = require('express');
const userController = require('./controllers/userController');
const pageController = require('./controllers/pageController');

const router = express.Router();

router.get("/", pageController.home);
router.get("/usuarios", pageController.usuarios);
router.post("/usuarios/:opcion", userController.post_usuarios);
router.get("/usuarios/:opcion", userController.get_usuarios);


module.exports = router;