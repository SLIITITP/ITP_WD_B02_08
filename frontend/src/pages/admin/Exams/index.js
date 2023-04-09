import React from 'react'
import PageTitle from '../../../components/PageTitle'
import { Button  } from 'antd';
import { useNavigate } from "react-router-dom";

export default function Exams() {
  const navigate = useNavigate();
  return (
    <div>
        <div className="flex justify-between mt-2">
            <PageTitle title="Exams"/>

            <Button  className="primary-outlined-btn flex items-center"
              onClick={()=> navigate("/admin/exams/add")}
            >
            <i className="ri-add-line"></i>
                Add Exams
            </Button>
        </div>
    </div>
  )
}
