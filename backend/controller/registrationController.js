// import UserModel from '../models/User.model.js';
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpenerator = require("otp-generator");


// // exports . loginForm = ( req, res ) => {
// //     res. render ( 'login' , { title : 'Login' });
// // };

// function loginUser(req, res) {
//   const { email, password } = req.body;

//   // Validate user input
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   // Check if user exists (in a real app, you'd probably use a database instead)
//   if (email !== "testuser@example.com" || password !== "password123") {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   // Return JWT token (in a real app, you'd likely use a third-party authentication service instead)
//   const token = "sample-jwt-token";
//   res.json({ token });
// }

// async function registers(req, res) {
//   console.log(req.body);
//   const { username, password, profile, email } = req.body;
//   if(username===''){
//     res.status(500).send({ error:"Crediontlas are not valid"});
//     return
//   }

//   bcrypt.hash(password, 10).then(
//     (hashedPassword) => {
//       const user = new UserModel({
//         username,
//         password: hashedPassword,
//         profile: profile || "",
//         email,
//       });
//       user
//         .save()
//         .then((result) =>
//           res.status(201).send({result , msg: "User Register Successfully" })
//         )
//         .catch((error) => {
//           if (error.keyValue.email) {
//             return res.status(500).send({ error:"Already Added email"});
//           }
//           if (error.keyValue.username) {
//             return res.status(500).send({ error:"Already Added UserName"});
//           }

//         });
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// }

// /** POST: http://localhost:8080/api/register
//  * @param : {
//   "username" : "example123",
//   "password" : "admin123",
//   "email": "example@gmail.com",
//   "firstName" : "bill",
//   "lastName": "william",
//   "mobile": 8009860560,
//   "address" : "Apt. 556, Kulas Light, Gwenborough",
//   "profile": ""
// }
// */


/*get all user */
async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find({});
    if (!users) {
      return res.status(404).json({ error: 'No Users Found' });
    }
    const userList = users.map(user => {
      const { password, ...rest } = user.toObject();
      return rest;
    });
    return res.status(200).json(userList);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server Error' });
  }
}



//middleware for verify the user
async function verifyUser(req, res, next){
  try {
      
      const { username } = req.method == "GET" ? req.query : req.body;

      // check the user existance
      let exist = await UserModel.findOne({ username });
      if(!exist) return res.status(404).send({ error : "Can't find User!"});
      next();

  } catch (error) {
      return res.status(404).send({ error: "Authentication Error"});
  }
}




async function registers(req, res) {
  console.log(req.body);
  try {
    const { username, password, profile, email } = req.body;
    //check the existing user
    const existUsername = new Promise((resolve, reject) => {
      console.log(resolve);
      UserModel.findOne({ username }).then(
        (res) => {
          if (res) reject({ error: "Please use unique username" });
          resolve();
        },
        (err) => {
          if (err) reject(new Error(err));
        }
      );
    });
    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
      console.log(resolve);
      UserModel.findOne({ email }).then(
        (res) => {
          if (res) reject({ error: "Please use unique email" });
          resolve();
        },
        (err) => {
          if (err) reject(new Error(err));
        }
      );
    });
    Promise.all([existUsername, existEmail])
      .then(() => {
        console.log(password);
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  //loginUser,
  getAllUsers,
  registers,
  login,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
  verifyUser,
  deleteUser,
  updateTeacher,
  tearegister
};

/** POST: http://localhost:8080/api/login
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/

async function login(req, res) {
  
  const { username, password } = req.body;

  try {
      
      UserModel.findOne({ username })
          .then(user => {
              bcrypt.compare(password, user.password)
                  .then(passwordCheck => {

                      if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                      // create jwt token
                      const token = jwt.sign({
                                      userId: user._id,
                                      username : user.username
                                  }, 'secret' , { expiresIn : "24h"});

                      return res.status(200).send({
                          msg: "Login Successful...!",
                          username: user.username,
                          token
                      });                                    

                  })
                  .catch(error =>{
                      return res.status(400).send({ error: "Password does not Match"})
                  })
          })
          .catch( error => {
              return res.status(404).send({ error : "Username not Found"});
          })

  } catch (error) {
      return res.status(500).send({ error});
  }


}

/** GET: http://localhost:8080/api/user/example123 */
async function getUser(req, res) {
  
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: 'Invalid Username' });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User Not Found' });
    }

    const { password, ...rest } = user.toObject();

    return res.status(200).json(rest);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server Error' });
  }

}

/** PUT: http://localhost:8080/api/updateuser
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/

async function updateUser(req, res){
  try {
    //const { userId } = req.user;
    const id = req.query.id;
    console.log(id)
    if (!id) {
      return res.status(401).json({ error: 'User Not Found' });
    }

    const body = req.body;

    // update the data
    await UserModel.updateOne({ _id: id }, body);

    return res.status(200).json({ msg: 'Record Updated' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server Error' });
  }
};


/** GET: http://localhost:8080/api/generateOTP */
async function generateOTP(req, res) {
  req.app.locals.OTP = await otpenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
  res.status(201).send({ code: req.app.locals.OTP })
}

/** GET: http://localhost:8080/api/verifyOTP */
async function verifyOTP(req, res) {
  const { code } = req.query;
  if(parseInt(req.app.locals.OTP) === parseInt(code)){
      req.app.locals.OTP = null; // reset the OTP value
      req.app.locals.resetSession = true; // start session for reset password
      return res.status(201).send({ msg: 'Verify Successsfully!'})
  }
  return res.status(400).send({ error: "Invalid OTP"});
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
async function createResetSession(req, res) {
  if(req.app.locals.resetSession){
      //allow access to this route only once 
    return res.status(201).send({ flag: req.app.locals.resetSession})
}
return res.status(440).send({ error: "Session expired!"});
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
async function resetPassword(req, res) {
  try {
     if (!req.app.locals.resetSession) {
       return res.status(440).send({ error: "Session expired!" });
     }

    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "Username not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

    req.app.locals.resetSession = false; // reset session

    return res.status(201).json({ msg: "Record Updated...!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

/delete user/
async function deleteUser(req, res) {
  try {
    const id = req.query.id;
    console.log(id);
    if (!id) {
      return res.status(401).json({ error: 'User Not Found' });
    }

    // delete the user
    await UserModel.deleteOne({ _id: id });

    return res.status(200).json({ msg: 'Record Deleted' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server Error' });
  }
};



//=================================Teacher=======================================

async function updateTeacher(req, res){
  try {
    //const { userId } = req.user;
    const id = req.query.id;
    console.log(id)
    if (!id) {
      return res.status(401).json({ error: 'User Not Found' });
    }

    const body = req.body;

    // update the data
    await TeacherModel.updateOne({ _id: id }, body);

    return res.status(200).json({ msg: 'Record Updated' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server Error' });
  }
};



async function tearegister(req, res) {
  console.log(req.body);
  try {
    const { username, password, profile, email } = req.body;
    //check the existing user
    const existUsername = new Promise((resolve, reject) => {
      console.log(resolve);
      TeacherModel.findOne({ username }).then(
        (res) => {
          if (res) reject({ error: "Please use unique username" });
          resolve();
        },
        (err) => {
          if (err) reject(new Error(err));
        }
      );
    });
    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
      console.log(resolve);
      UserModel.findOne({ email }).then(
        (res) => {
          if (res) reject({ error: "Please use unique email" });
          resolve();
        },
        (err) => {
          if (err) reject(new Error(err));
        }
      );
    });
    Promise.all([existUsername, existEmail])
      .then(() => {
        console.log(password);
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}