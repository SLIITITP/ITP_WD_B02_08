import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from "react-router-dom";

const PaymentCheckout = (studentInfo) => {
  const location = useLocation();
//   const { studentId, date, month, subjects, grade, paidAmount } = location.state;

  console.log(studentInfo)


    return (
        <div>
            <h1>Payment Checkout</h1>
        {studentInfo.paidAmount}
        console.log(studentInfo)

            {/* <p>Student ID: {studentId}</p>
            <p>Date: {date}/{month}</p>
            <p>Subjects: {subjects}</p>
            <p>Grade: {grade}</p>
            <p>Paid Amount: {paidAmount}</p> */}
            {/* rest of your checkout form */}
        </div>
    );
}

export default PaymentCheckout;
