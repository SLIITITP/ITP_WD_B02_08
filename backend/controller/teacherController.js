const TeacherModel = require('../models/teacher.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpenerator = require("otp-generator");

module.exports = {

    updateTeacher,
    tearegister

}





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
        TeacherModel.findOne({ email }).then(
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
                const user = new TeacherModel({
                  username,
                  password: hashedPassword,
                  profile: profile || "",
                  email,
                });
  
                // return save result as a response
                user
                  .save()
                  .then((result) =>
                    res.status(201).send({ msg: "Teacher Register Successfully" })
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