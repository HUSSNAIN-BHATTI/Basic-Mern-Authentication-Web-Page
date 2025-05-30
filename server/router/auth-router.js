const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const signUpshema = require("../validator/auth-validator");
const validate = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/authMiddleware");

router 
    .route("/")
    .get(authControllers.home);
router
    .route("/register")
    .post(validate(signUpshema),authControllers.register);
router
    .route("/login")
    .post(authControllers.login);
router
    .route("/user")
    .get(authMiddleware,authControllers.user);



module.exports = router;