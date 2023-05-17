import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../images/profile.png";
import styles from "../stylesheets/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../validations/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../redux/store1";
import { verifyPasswordTeacher, getProfileTeacher, getProfile } from "../apicalls/helper";

const PasswordTeacher = () => {
  const navigate = useNavigate();
  //const {username}=useAuthStore(state => state.auth)
  // const [{isLoading , apiData , serverError}] = useFetch(`/user/${username}`)
  //console.log(apiData)
  const [apiData, setApiData] = useState({});
  const [file, setFile] = useState();
  const { username } = useAuthStore((state) => state.auth);

  useEffect(() => {
    console.log(username);
    getProfileTeacher(username).then((results) => {
      let apiData = results.data;
      setApiData({
        firstName: apiData?.firstName || "",
        lastName: apiData?.lastName || "",
        email: apiData?.email || "",
        mobile: apiData?.mobile || "",
        address: apiData?.address || "",
        admin: apiData?.admin || "",
        // id:apiData._id
      });
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      password: '',
      //profile:apiData?.profile || ''
    },

    validate: passwordValidate,                 //validate the input text box and return value
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {                  //validate only after submitting button

      let loginPromise = verifyPasswordTeacher({ username, password: values.password })

      toast.promise(loginPromise, {
        loading: 'Cheking...',
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token)

        if (apiData?.admin) {
          navigate('/adminHome');
        } else {
          navigate('/teacherProfile');
        }

      })

    }
  })

  return (
    <div className={styles.body}>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Hello {username}</h4>
              {/* {apiData?.firstName || apiData?.username} */}
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Explore more by connecting with us
              </span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <img
                  src={apiData?.profile || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                ></img>

                {/* src={apiData?.profile || avatar} */}
              </div>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type="password"
                  placeholder="Password"
                />

                <button className={styles.btn} type="submit">
                  Log in
                </button>
              </div>
              <div className="text-center py-2 px-3.5">
                <span className="text-gray-500">
                  Forgot password{" "}
                  <Link className="text-red-500" to="/recovery">
                    Recover Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordTeacher;
