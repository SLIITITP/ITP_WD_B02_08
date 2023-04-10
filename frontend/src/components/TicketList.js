import React,{ Component} from 'react';
import axios from 'axios';



export default class TicketList extends Component{
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
      <h3 className="text-3xl font-bold dark:text-white" style={{marginLeft:'20px'}}> Ticket List</h3>
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

      <div><center>
        <h4  class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
       <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500"> Total Tickets:  {this.state.tickets.length}</mark></h4>
      </center></div>

<br></br>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Reg.Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Subject
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Open Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
      
            {this.state.tickets.map((tickets,index)=>(
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row"  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index+1} </th>
                  <td class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                    <a href={ `/reply/${tickets._id}`} style={{textDecoration:'none'}}>
                    {tickets.Rnumber}
                    </a>
                  </td>
                  <td>{tickets.subject}</td>
                  <td>{tickets.status}</td>
                  <td>{tickets.openAt}</td>
                  <td> 
                   
                    

            <a class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
             href="#" onClick={()=>this.onDelete(tickets._id)}>Delete</a>
         
                   
                
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</div>
        
        

    </div>
 
  
   )
 }
}