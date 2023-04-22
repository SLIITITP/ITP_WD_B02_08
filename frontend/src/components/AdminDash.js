import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../stylesheets/Username.module.css';
import generatePDF from '../apicalls/Reportgenerator';
import style from '../stylesheets/AdminDash.module.css';

function AdminDash() {

  const [Userdata,setUserData] = useState([]);
  const [search,setSearch] = useState("");
  const columnsPDF = [{ Username:'Username',Email:'Email' }]

  useEffect(() => {
    axios.get("http://localhost:9090/api/getAllUsers").then((res) => {
      setUserData(res.data);
    }).catch(err => {
      alert(err);
    })
  },[])
  return (
    <div>
      <h1 style={{textAlign:"center",fontSize:'40px',marginTop:'1%'}}>All Users</h1>
      <br/>
      <div className='top' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      <form >
        
        <input type="search"
              value = {search}
              placeholder=" Search for username"
              aria-label="Search"
              onChange={(e) =>{setSearch(e.target.value)}}
             />

<button className='btnDownload'
      
      onClick={() => generatePDF(
        Userdata.map(m => ({
          Username: m.username,
          Email: m.email,
          mobile:m.mobile
      }
  )), columnsPDF, false, 'All Users')}>
    Download</button>
      </form>
      
      </div>
        <table className={style.table}>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Delete</th>
          </tr>
            {Userdata.filter((element) => {
              if(search === ""){
                return element
                }else if ((element.username.toLowerCase()).includes(search.toLowerCase())) {
                    return element
                }
            }).map((elm,i) => (
                <tr key = {i}  style={{textAlign : 'center',fontWeight : '400'}}>
                        <td>{elm.username}</td>
                        <td>{elm.email}</td>
                        <td>{elm.mobile}</td>
                        
                        <td><button>Delete</button></td>
                    </tr>
            ))}
            
        </table>
    </div>
  )
}




export default AdminDash;


