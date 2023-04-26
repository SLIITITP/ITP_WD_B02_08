import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../images/profile.png";
import styles from "../stylesheets/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../validations/validate";
import convertToBase64 from "../validations/convert";
import extend from "../stylesheets/Profile.module.css";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../redux/store1";
import {
  updateUser,
  getProfileTeacher,
  deleteUser,
  updateTeacher,
} from "../apicalls/helper";

export default function TeaProfile() {
  const navigate = useNavigate();

  // let apiData = {}
  const [apiData, setApiData] = useState({});
  const [file, setFile] = useState();
  const { username } = useAuthStore((state) => state.auth);
  //  const [{isLoading , apiData , serverError}] = useFetch(`/user/${username}`)
  useEffect(() => {
    console.log(username);
    let usernameFrom = localStorage.getItem("userName");
    // username = ;
    console.log(usernameFrom);
    if (username === "") {
      let userNameReload = localStorage.getItem("userName");
      getProfileTeacher(userNameReload).then((results) => {
        let apiData = results.data;
        console.log(results);
        setFile(apiData?.profile || "");
        setApiData({
          firstName: apiData?.firstName || "",
          lastName: apiData?.lastName || "",
          email: apiData?.email || "",
          teaId: apiData?.teaId || "",
          address: apiData?.address || "",
          profile: apiData?.profile || "",
          id: apiData._id,
          teacherId: apiData?.teacherId

        });
      });
    } else {
      getProfileTeacher(username).then((results) => {
        let apiData = results.data;
        console.log(results);
        setFile(apiData?.profile || "");
        setApiData({
          firstName: apiData?.firstName || "",
          lastName: apiData?.lastName || "",
          email: apiData?.email || "",
          teaId: apiData?.teaId || "",
          address: apiData?.address || "",
          profile: apiData?.profile || "",
          id: apiData._id,
          teacherId: apiData?.teacherId

        });
      });
    }
  }, []);
  //console.log(apiData1)
  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      teaId: apiData?.teaId || "",
      address: apiData?.address || "",
      profile: apiData?.profile || "",
      teacherId: apiData?.teacherId
    },
    enableReinitialize: true,
    validate: profileValidation, //validate the input text box and return value
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      //validate only after submitting button
      console.log(file);
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
      let updatePromise = updateTeacher(values, apiData.id);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Sucessfully...!</b>,
        error: <b>Could Not Update!</b>,
      });

      // values = await Object.assign(values , {profile : file || ''})

      //  updatePromise.then(res => {

      //     navigate('/plogin')
      //   })
    },

    //   onSubmit : async values =>{                 //validate only after submitting button
    //     //values = await Object.assign(values , {profile : apiData.profile ||'' })

    //     let deletePromise = deleteUser(apiData.id);

    //     toast.promise(deletePromise, {
    //       loading: 'Deleting...',
    //       success: <b>Delete Sucessfully...!</b>,
    //       error: <b>Could Not Delete!</b>,

    //     });

    //     // deletePromise.then(res => {

    //     //   navigate('/registers')
    //     // })
    // }
  });

  //cretae file upload handler
  const onUpload = async (e) => {
    convertToBase64(e.target.files[0]).then(
      (res) => {
        console.log(res);
        setFile(res);
        setApiData((pre) => ({
          ...pre,
          profile: file,
        }));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  //logout handler function
  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  //if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  //if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  //GPT

  return (
    <div className={styles.bodyprofile}>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
          <div
            className={`${styles.glass} ${extend.glass}`}
            style={{ height: "98%" }}
          >
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold"> Teacher Profile</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                You can update the details
              </span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    src={file || avatar}
                    className={`${styles.profile_img} ${extend.profile_img}`}
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
                <div className="name flex w-3/4 gap-10">
                  <input
                    {...formik.getFieldProps("firstName")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="FirstName*"
                  />
                  <input
                    {...formik.getFieldProps("lastName")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="LastName*"
                  />
                </div>
                <div className="name flex w-3/4 gap-10">
                  <input
                    {...formik.getFieldProps("teacherId")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="Teacher ID"
                  />
                  <input
                    {...formik.getFieldProps("email")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="email"
                    placeholder="Email Address*"
                  />
                </div>

                <input
                  {...formik.getFieldProps("address")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Address*"
                />
                <button className={styles.btn} type="submit">
                  Update
                </button>
                {/* <button className={styles.btn} type='submit' onClick={deleteUser}>Delete</button> */}
              </div>
              <div className="text-center py-2 px-3.5">
                <span className="text-gray-500">
                  Come back later?{" "}
                  <button
                    onClick={userLogout}
                    className="text-red-500"
                    to="/plogin"
                  >
                    Logout
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
