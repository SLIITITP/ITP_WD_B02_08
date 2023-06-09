
import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { tloginUser } from '../../../apicalls/teachers'
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Login() {
  const dispatch = useDispatch(); //for loader
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading()); //showing loader
      const response = await tloginUser(values);
      dispatch(HideLoading()); //hide loader
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        localStorage.setItem("userName" , values.username );
        window.location.href = "/texams";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen backgroundpic">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col">
          <div className="flex">
            <h1 className="text-2xl">Quiz Portal <i class="ri-login-circle-line"> Teachers Login</i></h1>
            
          </div>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="email" label="Email">
              <input type="text" className="w-100"/>
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" className="w-100"/>
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
