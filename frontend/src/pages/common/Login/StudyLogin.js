import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserInfo, loginUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import studyMain from '../../../assets/newUpdatebg.png';
import { SetUser } from "../../../redux/usersSlice";




function StudyLogin() {

   /*  const getUserData = async () => {
        try {
          dispatch(ShowLoading());
          const response = await getUserInfo();
          dispatch(HideLoading());
          if (response.success) {
            dispatch(SetUser(response.data));
            const user = SetUser(response.data);
            console.log(user.payload.isAdmin)
            console.log(typeof(user.payload.isAdmin));
           // let success = true;

           
            if (user.payload.isAdmin == true) {
              window.location.href = "/smt";
            }else if(user.payload.isAdmin !== true) {
              window.location.href = "/sms";
            }
         
          } else {
            message.error(response.message);
          }
        
        } catch (error) {
          //navigate("/login"); //if there is problem with token user navigate login
          dispatch(HideLoading());
          message.error(error.message);
        }
      }; */

     /*  const getUserData = async () => {
        try {
          dispatch(ShowLoading());
          const response = await getUserInfo();
          dispatch(HideLoading());
      
          if (response.success) {
            dispatch(SetUser(response.data));
            const user = response.data;
            console.log(user.payload.isAdmin);
            console.log(typeof user.payload.isAdmin);
      
            if (user.payload.isAdmin === true) {
              window.location.href = "/smt";
            }else {
              window.location.href = "/sms";
            }
          } else {
            message.error(response.message);
          }
      
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      };
      
    
  
    

  const dispatch = useDispatch(); //for loader
  const onFinish = async (values) => {
    try {

      dispatch(ShowLoading()); //showing loader
      const response = await loginUser(values);
      console.log(response);
      dispatch(HideLoading()); //hide loader

      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        localStorage.setItem("userName" , values.name );
        if (localStorage.getItem("token")) {
            getUserData();
        }

      
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }; */
  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
  
      if (response.hasOwnProperty('success') && response.success) {
        dispatch(SetUser(response.data));
        const user = response.data;
        console.log(user.payload.isAdmin);
        console.log(typeof user.payload.isAdmin);
  
        if (user.payload.isAdmin === true) {
          window.location.href("/smt");
        } else {
          window.location.href("/sms");
        }
      } else {
        message.error(response.message);
      }
  
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  
  const dispatch = useDispatch(); //for loader
  
  
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading()); //showing loader
      const response = await loginUser(values);
      console.log(response);
      dispatch(HideLoading()); //hide loader
  
      if (response.hasOwnProperty('success') && response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        localStorage.setItem("userName", values.name);
  
        if (localStorage.getItem("token")) {
          await getUserData();
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  
  return (
    <>
  
    <div className="!md:container flex-wrap md:mx-auto max-w-full min-w-fit grid grid-cols-1 md:grid-cols-2 m-8 pr-16 box-border drop-shadow-md overflow-hidden h-auto mt-36">
    <img src={studyMain} className="!h-auto max-w-xl mx-auto md:mx-0" alt='main page'/>
    <div className="!md:ml-8 mt-8 md:mt-0">
      <h1 className="!text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center md:text-left">
        WELCOME TO STUDY MATERIAL SECTION
      </h1>
      <p className="!font-normal text-center md:text-left mt-8 text-gray-700 dark:text-gray-400">
        Welcome to the study material entry! This is your gateway to a vast collection of educational resources that will help you learn and grow. Here, you'll find a variety of study materials such as NOTES, CLASS RECORDS, PDF and more.
      </p>
      <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="email" label="Email">
              <input type="text" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" />
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Login
              </button>
              <Link to="/register" className="underline">
                Not a member? Register
              </Link>
            </div>
          </Form>
</div>
</div>

</>
  );
}
  export default StudyLogin;