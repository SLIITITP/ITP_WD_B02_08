//const { route } = require("./Payment");

const router = require("express").Router();
//import * as controller from '../controller/registrationController.js';
const controller = require('../controller/registrationController.js');


// const call = ()=>{
//     return controller.loginUser;
// }
//Post method
router.post("/registration", controller.registers)
router.post("/login",controller.verifyUser, controller.login);

// //router.route('/registerMail').post();
// router.route('/authenticate').post((req, res) => res.send());
// router.route('/login').post(controller.login);


// //get method
router.get("/user/:username" ,controller.getUser);
// router.route('/generateOTP').get(controller.generateOTP);
// router.route('/verifyOTP').get(controller.verifyOTP);
// router.route('/createResetSession').get(controller.createResetSession);


// //put methods
// router.route('/updateuser').put(controller.udateUser);
// router.route('/resetPassword').put(controller.resetPassword);




module.exports = router;