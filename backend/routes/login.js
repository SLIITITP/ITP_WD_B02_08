//const { route } = require("./Payment");

const router = require("express").Router();
//import * as controller from '../controller/registrationController.js';
const controller = require('../controller/registrationController.js');
const Auth = require('../middlewares/auth.js');
const localVariables = require('../middlewares/auth.js')
const registerMail = require('../controller/mailer.js')
//import {registerMail} from '../controller/mailer.js'

// const call = ()=>{
//     return controller.loginUser;
// }
//Post method

router.post("/registration", controller.registers)
router.post("/login",controller.verifyUser, controller.login);
router.post("/registerMail",registerMail);
// //router.route('/registerMail').post();
// router.route('/authenticate').post((req, res) => res.send());
// router.route('/login').post(controller.login);


// //get method
router.get("/user/:username" ,controller.getUser);
router.get("/generateOTP",controller.verifyUser,localVariables, controller.generateOTP)
router.get("/verifyOTP",controller.verifyOTP);
router.get("/createResetSession",controller.createResetSession);


// //put methods
router.put("/updateuser" ,controller.updateUser);
// router.route('/updateuser').put(controller.udateUser);
router.put("/resetPassword",controller.verifyUser,controller.resetPassword);




module.exports = router;