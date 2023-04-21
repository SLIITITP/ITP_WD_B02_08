import React from 'react'
import { Link} from 'react-router-dom';


export default function NipTest() {


  return (
    <div>NipTest<br/>
      <Link to={'/viewPayment'}><button>ViewPayment</button><br/></Link>
      <Link to={'/addPayment'}><button>AddPayment</button><br/></Link>
      <Link to={'/salary/calculate'}><button>SalaryCalculation</button><br/></Link>
      <Link to={'/salary/history'}><button>SalaryHistory</button><br/></Link>
      <Link to={'/am/add'}><button>AM add</button><br/></Link>
      <Link to={'/am/check'}><button>AM check</button><br/></Link>
      <Link to={'/payment/addSubToTeachers'}><button>SUBJECT ADDING</button><br/></Link>
      <Link to={'/subject/update'}><button>SUBJECT UPDATING</button><br/></Link>
      <Link to={'/payOnline'}><button>PAY ONLINE</button><br/></Link>
    </div>
  )
}
