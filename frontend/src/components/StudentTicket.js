import React,{ Component} from 'react';
import axios from 'axios';

export default class StudentTicket extends Component{
  constructor(props){
    super(props);

    this.state={
      tickets:[]
    };
  }
  
    componentDidMount(){
      this.retrieveTickets();
    }

  retrieveTickets(){
    axios.get("http://localhost:9090/tickets").then(res=>{
      if(res.data.success){
        this.setState({
          tickets:res.data.existingTickets
          });
          console.log(this.state.tickets)
      }
    });
  }

  onDelete =(id)=>{
    axios.delete(`http://localhost:9090/ticket/delete/${id}`).then((res)=>{
    alert("Delete Successfully");
    this.retrieveTickets();
    })
  }

  filterData(tickets,searchKey){

    const result = tickets.filter((ticket) =>
    ticket.Rnumber.toLowerCase().includes(searchKey)||
    ticket.subject.toLowerCase().includes(searchKey)||
    ticket.openAt.toLowerCase().includes(searchKey)||
    ticket.status.toLowerCase().includes(searchKey)
    )
  this.setState({tickets:result})
  }

  handleSearchArea= (e)=>{
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:9090/tickets").then(res=>{
        if(res.data.success){
          
            this.filterData(res.data.existingTickets,searchKey)
  }
});
  }

 render(){
  return(

    
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
            <h4>My Tickets </h4>
        </div>

        
        <div className="col-lg-3 mt-2 mb-3">
            <input
            className="form-control"
            type="search"
            placeholder="Search"
            name="searchQuery"
            onChange={this.handleSearchArea}>

            </input>
        </div>
      </div>
      <center> <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white',padding: "10px 50px" ,margin:"80px 30px"}}>Add new Ticket</a></button>
</center>
     

        
          <table className="table table-hover" style={{marginTop:'40px'}}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Reg.Number</th>
                <th scope="col">Subject</th>
                <th scope="col">Status</th>
                <th scope="col">Open Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tickets.map((tickets,index)=>(
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>
                    <a href={ `/vreply/${tickets._id}`} style={{textDecoration:'none'}}>
                    {tickets.Rnumber}
                    </a>
                  </td>
                  <td>{tickets.subject}</td>
                  <td>{tickets.status}</td>
                  <td>{tickets.openAt}</td>
                  <td> 
                    <a className="btn btn-warning" href={`/edit/${tickets._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(tickets._id)}>
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        
       

    </div>
 
  
   )
 }
}
