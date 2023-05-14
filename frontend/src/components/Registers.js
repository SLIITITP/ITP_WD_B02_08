import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../images/profile.png";
import styles from "../stylesheets/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValdation } from "../validations/validate";
import convertToBase64 from "../validations/convert";
import { registerUser1 } from "../apicalls/helper";
import { registerUser } from "../apicalls/users";
import { message } from "antd";


import alanBtn from "@alan-ai/alan-sdk-web";

export default function Register() {
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [showPassword,setShowPassword]=useState(false);
  // const ALAN_KEY = `9fc60efc76173484ba7004ef5b5618262e956eca572e1d8b807a3e2338fdd0dc/stage`
  // const ALAN_KEY = '046117989bcbdb7e620544158647473c2e956eca572e1d8b807a3e2338fdd0dc/stage'
  // const [alanInstance, setAlanInstance] = useState(null);
  const validations = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.username) {
      errors.username = "Username Required";
    }
    if (!values.password) {
      errors.password = "Password Required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be at least 5 characters";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/i.test(values.password)) {
      errors.password = "Add atleats one Speacual character";
    }
    if(!values.rePassword){
      errors.rePassword="Re Password Required";
    }else if(values.rePassword!=values.password){
      errors.rePassword="Passwords not matched";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      rePassword:"",
      grade: "",
    },
    // validate:registerValdation,
    validate: validations, //validate the input text box and return value
    //validate the input text box and return value
    // validateOnBlur: false,
    // validateOnChange: false,
    onSubmit: async (values) => {
      //validate only after submitting button
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
      let registerPromise = registerUser1(values);
      const response = await registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register</b>,
      });

      registerPromise.then(function () {
        navigate("/plogin");
      });
    },
  });

  function showButton(){
    setShowPassword((pre)=>!pre)
  }
  // useEffect(() => {
  //  console.log("text");
  //   alanBtn({
  //     key: ALAN_KEY,
  //     onCommand: (commandData) => {
  //       console.log(commandData)
  //       if (commandData.command === 'email') {
  //         formik.setFieldValue("email",commandData.data);
  //         // alanInstance.playText(`Setting email to ${commandData.data}`);

  //       } else if (commandData.command === 'username') {
  //         formik.setFieldValue('username', commandData.data);
  //       }
  //     },
  //   });
  //   // setAlanInstance(alan);
  //   // formik.setFieldValue("email", "Damish");

  // }, [alanBtn]);

  // const handleEmailChange = (e, alanInstance) => {
  //   console.log(e);
  //   formik.handleChange(e);
  //    alanInstance.playText(`Setting email to ${e.target.value}`);

  // };

  // const handleUsernameChange = (e, alanInstance) => {
  //   formik.handleChange(e);
  //   alanInstance.playText(`Setting username to ${e.target.value}`);
  // };

  //cretae file upload handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);

      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className={styles.body}>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass} style={{ height: "85%" }}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold"> Thilina Registration</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Welcome to Thilina Educational Institute
              </span>
            </div>
            <form
              className="py-1"
              onSubmit={formik.handleSubmit}
              onFinish={onFinish}
            >
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    src={file || avatar}
                    className={styles.profile_img}
                    alt="avatar"
                  ></img>
                </label>

                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                ></input>
              </div>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="Email*"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={
                    (formik.errors.email && formik.touched.email)
                      ? styles.textStyleError
                      : styles.textbox
                  }
                  error={formik.errors.email && formik.touched.email}
                />
                {(formik.errors.email && formik.touched.email) && (
                  <div className="text-red-500 p-0">{formik.errors.email}</div>
                )}
                <input
                  {...formik.getFieldProps("username")}
                  className={
                    formik.errors.username
                      ? styles.textStyleError
                      : styles.textbox
                  }
                  error={formik.errors.username}
                  type="text"
                  placeholder="Username*"
                  id="name"
                />
                {formik.errors.username && formik.touched.username && (
                  <div className="text-red-500 p-0">
                    {formik.errors.username}
                  </div>
                )}
                <div className="flex justify-center" style={{ width: "75%" }}>
                  <input
                    {...formik.getFieldProps("password")}
                    className={
                      (formik.errors.password && formik.touched.password)
                        ? styles.textStyleError
                        : styles.textbox
                    }
                    style={{ width: "100%" }}
                    error={formik.errors.password}
                    type={showPassword ? "Password" : "text"}
                    placeholder="Password*"
                  />
                  <button type="button" onClick={() => {showButton()}}>
                  {showPassword ? (
                      "Show"
                    ) : (
                      "Hidden"
                    )}
                  </button>
                </div>
                {(formik.errors.password && formik.touched.password) && (
                  <div className="text-red-500 p-0">
                    {formik.errors.password}
                  </div>
                )}
                  <input
                    {...formik.getFieldProps("rePassword")}
                    className={
                      formik.errors.rePassword && formik.touched.rePassword
                        ? styles.textStyleError
                        : styles.textbox
                    }
                    error={formik.errors.rePassword}
                    type={showPassword ? "Password" : "text"}
                    placeholder="Re password*"
                  />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <div className="text-red-500 p-0">
                    {formik.errors.rePassword}
                  </div>
                )}
                <select
                  {...formik.getFieldProps("grade")}
                  className={styles.textbox}
                >
                  <option value="" defaultValue={"6"}>
                    Select Grade
                  </option>
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                </select>

                <button className={styles.btn} type="submit">
                  Register
                </button>
              </div>
              <div className="text-center py-2 px-3.5">
                <span className="text-gray-500">
                  Already Register?{" "}
                  <Link className="text-red-500" to="/plogin">
                    Login now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
