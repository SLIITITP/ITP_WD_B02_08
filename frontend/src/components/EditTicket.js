import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function EditTicket(props) {
  const [Rnumber, setRnumber] = useState("");
  const [subject, setsubject] = useState("");
  const [issueDate, setissueDate] = useState("");
  const [details, setdetails] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:9090/ticket/${id}`).then((res)=>{
      if(res.data.success){
        setRnumber(res.data.ticket.Rnumber);
        setsubject(res.data.ticket.subject);
        setissueDate(res.data.ticket.issueDate);
        setdetails(res.data.ticket.details);
      }
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Rnumber") {
      setRnumber(value);
    } else if (name === "subject") {
      setsubject(value);
    } else if (name === "issueDate") {
      setissueDate(value);
    } else if (name === "details") {
      setdetails(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      Rnumber:Rnumber,
      subject:subject,
      issueDate:issueDate,
      details:details,
    };
    
    axios.put(`http://localhost:9090/ticket/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Ticket Update Successfully");
        setRnumber("");
        setsubject("");
        setissueDate("");
        setdetails("");
      }
    });
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 front-weight-normal">Edit ticket</h1>
      <form className="needs-validation" noValidate>
      <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Registration Number</label>
              <input type="text"
              className="form-control"
              name="Rnumber"
              placeholder="Enter Reg number"
              value={Rnumber}
              onChange={handleInputChange}/>
            </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Topic</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            placeholder="Enter subject"
            value={subject}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>updateDate</label>
          <input
            type="date"
            className="form-control"
            name="issueDate"
            placeholder="Enter Date"
            value={issueDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Details</label>
          <input
            type="text"
            className="form-control"
            name="details"
            placeholder="Enter details"
            value={details}
            onChange={handleInputChange}
          />
        </div>

        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: "15px" }}
          onClick={onSubmit}
        >
          <i className="far fa-check-square"></i>
          &nbsp;Update
        </button>
      </form>
    </div>
  );
}
