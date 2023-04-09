import React,{ Component} from 'react';
import axios from 'axios';

export default class AddTicket extends Component{

  constructor(props){
    super(props);
    this.state={
      Rnumber:"",
      subject:"",
      issueDate:"",
      details:""
    }
  }

  handleInputChange=(e)=>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }

  onSubmit= (e) =>{
    e.preventDefault();

    const {Rnumber,subject,issueDate,details}=this.state;
    const data={
      Rnumber:Rnumber,
      subject:subject,
      issueDate:issueDate,
      details:details
    }
    console.log(data)
    axios.post("http://localhost:9090/ticket/save",data).then((res)=>{
      if(res.data.success){
        this.setState(
          {
            Rnumber:"",
            subject:"",
            issueDate:"",
            details:""
          }
        )
      }
    })
  }
  render(){
    return(
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="h3 mb-3 front-weight-normal">Create new Ticket</h1>
          <form className="needs-validation" noValidate>

          <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Registration Number</label>
              <input type="text"
              className="form-control"
              name="Rnumber"
              placeholder="Enter Reg number"
              value={this.state.Rnumber}
              onChange={this.handleInputChange}/>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Subject</label>
              <input type="text"
              className="form-control"
              name="subject"
              placeholder="Enter subject"
              value={this.state.subject}
              onChange={this.handleInputChange}/>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Issue Found Date</label>
              <input type="date"
              className="form-control"
              name="issueDate"
              placeholder="Enter Date"
              value={this.state.issueDate}
              onChange={this.handleInputChange}/>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Details</label>
              <input type="text"
              className="form-control"
              name="details"
              placeholder="Enter Details"
              value={this.state.details}
              onChange={this.handleInputChange}/>
            </div>

          <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp;Submit Ticket
          </button>

          </form>

         
          
        </div>
    )
  }
}
