const express = require('express');
const userController = require('../controllers/userController');
const pageController = require('../controllers/pageController');
const passport = require('passport');

const router = express.Router();

router.get("/", pageController.home);
router.get("/usuarios", pageController.usuarios);
router.get("/login", userController.get_login);
router.get("/usuarios/:opcion", userController.get_usuarios);

router.post("/usuarios/:opcion", userController.post_usuarios);


module.exports = router;