 import React from 'react'
 import { useNavigate } from 'react-router-dom';
import SubjectRelated from './SubjectRelated';




export default function TeacherD() {

    const navigate = useNavigate();

    const handleSubjectRelatedClick = () => {
        console.log('Subject Related clicked');
        // Do whatever you want to do when the element is clicked
        navigate('/subR');
    }



    return (
        <div className ="container">
 <div ><h1><center><b>  Submit your Assignments Here  </b></center></h1>

<br></br>


    <div class="container overflow-hidden">

        <div class="row gy-5">

            <div class="col-6">

                <div class="p-3 border bg-light"  onClick={handleSubjectRelatedClick} >Subject Related</div>
            </div>
            <div class="col-6">
                <div class="p-3 border bg-light">Home Work</div>
            </div>
            <div class="col-6">
                <div class="p-3 border bg-light">Group Work</div>
            </div>
            <div class="col-6">
                <div class="p-3 border bg-light">Extra Work</div>
            </div>
        </div>
    </div>



</div>

        </div>
       


    )
}



