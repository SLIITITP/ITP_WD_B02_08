//const jwt = require("jsonwebtoken");


//auth middleware
// module.exports= async function Auth (req,res,next){
//     try{
//         //access authorize header to validate request
//         const token = req.headers.authorization.split(" ")[1];

//         //retrive the user details of the logged in user
//         await jwt.verify(token); 
//         res.json(token);
//     }catch (error){
//         res.status(401).json({error : "Authentication Failed"})
//     }
// }

module.exports= async function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}
