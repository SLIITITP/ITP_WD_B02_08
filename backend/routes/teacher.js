const router = require("express").Router();
// import * as controller from '../controller/registrationController.js';
const controller = require('../controller/teacherController.js');
const Auth = require('../middlewares/auth.js');
const localVariables = require('../middlewares/auth.js')
const registerMail = require('../controller/mailer.js')





router.post('/authenticateTeacher',controller.verifyUser,((req, res) => res.send()));
router.put("/updateteacher",controller.updateTeacher);
router.post("/registerTeacher",controller.tearegister);
// router

module.exports = router;