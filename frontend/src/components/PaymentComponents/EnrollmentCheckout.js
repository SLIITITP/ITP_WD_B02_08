import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getUserInfo } from "../../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/usersSlice";
import { message } from "antd";
import { getProfile } from "../../apicalls/helper";

export default function EnrollmentCheckout() {
  const location = useLocation();

  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [id] = useState(location.state.stdID);
  const [studentId] = useState(location.state.studentId);
  const [Grade] = useState(location.state.stdGrade);

  return (
    <div>EnrollmentCheckout
      <p>_id:{id}</p>
      <p>StudentId:{studentId}</p>
      <p>Grade:{Grade}</p>
    </div>
    
  )
}
