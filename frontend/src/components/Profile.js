import React, { useEffect, useState, useRef } from "react";
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
import { updateUser, getProfile, deleteUser } from "../apicalls/helper";
import QRCodeGenerator from "./QRCodeGenerator";
import Modal from "react-modal";
import { Button, Card, Col, Input, Row, Typography } from "antd";
import QRCode from "qrcode";
import jsQR from "jsqr";

export default function Profile() {
  const navigate = useNavigate();

  const [deleteit, setDeleteit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");

  // let apiData = {}
  const [apiData, setApiData] = useState({});
  const [file, setFile] = useState();
  const { username } = useAuthStore((state) => state.auth);
  //  const [{isLoading , apiData , serverError}] = useFetch(`/user/${username}`)
  useEffect(() => {
    let usernameFrom = localStorage.getItem("userName");
    console.log(usernameFrom);
    getProfile(usernameFrom).then((results) => {
      let apiData = results.data;
      console.log(results);
      setApiData({
        firstName: apiData?.firstName || "",
        lastName: apiData?.lastName || "",
        email: apiData?.email || "",
        mobile: apiData?.mobile || "",
        address: apiData?.address || "",
        profile: apiData?.profile || "",
        id: apiData._id,
        studentId: apiData?.studentId || "",
      });
    });
  }, []);
  //console.log(apiData1)
  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
      profile: apiData?.profile || "",
      studentId: apiData?.studentId || "",
    },
    enableReinitialize: true,
    validate: profileValidation, //validate the input text box and return value
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      //validate only after submitting button
      values = await Object.assign(values, { profile: apiData.profile || "" });

      let updatePromise = updateUser(values, apiData.id);

      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Sucessfully...!</b>,
        error: <b>Could Not Update!</b>,
      });

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
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  //logout handler function
  function userLogout() {
    localStorage.removeItem("token");
    navigate("/plogin");
  }

  //if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  //if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  //GPT

  ///// QR code download

  // Create a ref to the QR code element
  // const qrCodeRef = useRef(null);

  // // Function to handle the download button click
  // const handleDownloadClick = () => {
  //   // Get the data URL of the QR code image
  //   const qrCodeDataURL = qrCodeRef.current?.toDataURL("image/png");

  //   const a = document.createElement("a");
  //   a.href = qrCodeDataURL;
  //   a.download = "qrcode.png";
  //   a.click();
  // };

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(apiData.studentId);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.bodyprofile}>
      <Modal
        isOpen={deleteit}
        onRequestClose={() => {
          setDeleteit(false);
        }}
      >
        <h2>Dialog Title</h2>
        <p>Dialog content goes here.</p>
        <button
          onClick={() => {
            setDeleteit(false);
          }}
        >
          Close
        </button>
      </Modal>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
          <div
            className={`${styles.glass} ${extend.glass}`}
            style={{ height: "98%" }}
          >
            <div className="flex justify-center">
              <div className="title flex flex-col items-center">
                <h4 className="text-5xl font-bold"> Student Profile</h4>
                <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                  {apiData.studentId} - {apiData.username}
                </span>
              </div>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    src={apiData?.profile || file || avatar}
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

              <div style={{ float: "right", marginTop: "-200px" }}>
                <Col className="col-span-8 lg:col-span-8 md:col-span-12 sm:col-span-24">
                  {/* <Input placeholder="Enter text here" onChange={(e) => setText(e.target.value)} /> */}
                  <Button
                    className="mt-4 mb-10"
                    variant="contained"
                    color="primary-outlined"
                    onClick={() => generateQrCode()}
                  >
                    Generate
                  </Button>
                  {imageUrl ? (
                    <a href={imageUrl} download>
                      <img className="w-24" src={imageUrl} alt="img" />
                    </a>
                  ) : null}
                </Col>
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
                    {...formik.getFieldProps("mobile")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="Contact No*"
                  />
                  <input
                    {...formik.getFieldProps("email")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="email"
                    placeholder="Email Address*"
                  />
                </div>

                <input
                  {...formik.getFieldProps("studentId")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="studentId*"
                  readOnly
                />
                <input
                  {...formik.getFieldProps("address")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Address*"
                />
                <button
                  className={styles.btn}
                  type="submit"
                  onClick={updateUser}
                >
                  Update
                </button>
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
            <button
              className={styles.btn}
              style={{
                margin: "auto 12.5%",
                background: "rgba(155,12,20,0.5)",
              }}
              onClick={() => {
                // setDeleteit(true);
                const confirmDelete=window.confirm("Are you sure you want to delete this?")
                if(!confirmDelete){
                  return
                }
                toast.promise(
                  deleteUser(apiData.id).then((res) => {
                    console.log(res);
                    if (res.data.status === 200) {
                      navigate("/");
                    }
                  }),
                  {
                    loading: "Delelting...",
                    success: <b>Delete Sucessfully...!</b>,
                    error: <b>Could Not Delete!</b>,
                  }
                );
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
