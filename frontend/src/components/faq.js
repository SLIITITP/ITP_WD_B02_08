import React,{ Component} from 'react';
import bac2 from '../assets/bac2.jpg'

export default class FAQ extends Component{

    


    render(){
      return(

        
      <div>
        <br></br>
        <div>
      <center><h3 className="text-3xl font-bold dark:text-white" style={{marginLeft:'20px'}}> Frequently Asked Questions </h3></center>
      </div>
      
      <br></br>

     {/*} <div className="opacity-50 absolute">
      <img src={bac2} alt="logo" style={{marginTop:'-200px'}} />
      </div>*/}
         
   <div class="accordion accordion-flush" id="accordionFlushExample" style={{marginLeft:'20px'}} >
    
   <div className="opacity-50 absolute">
      <img src={bac2} alt="logo" style={{marginTop:'-20px' ,width:'1600px',height:'700px'}}  />
      </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      How do I apply for registration?
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">To apply for registration, please fill out the registration form available on our website and submit it. Once your request is approved, you will receive a confirmation email.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      How can I get my unique ID?
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">Your unique ID is generated automatically and is included in your registration confirmation email. You can also access it through your profile page.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      How can I apply for a free card?
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">To apply for a free card, please log in to your account and go to the card section. From there, you can apply for a free card by providing your personal information.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefour" aria-expanded="false" aria-controls="flush-collapsefour">
      How do I apply for registration?
      </button>
    </h2>
    <div id="flush-collapsefour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">To apply for registration, please fill out the registration form available on our website and submit it. Once your request is approved, you will receive a confirmation email.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefive" aria-expanded="false" aria-controls="flush-collapsefive">
      How do I apply for registration?
      </button>
    </h2>
    <div id="flush-collapsefive" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">To apply for registration, please fill out the registration form available on our website and submit it. Once your request is approved, you will receive a confirmation email.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsesix" aria-expanded="false" aria-controls="flush-collapsesix">
      How do I apply for registration?
      </button>
    </h2>
    <div id="flush-collapsesix" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">To apply for registration, please fill out the registration form available on our website and submit it. Once your request is approved, you will receive a confirmation email.</div>
    </div>
  </div>
</div>
{/*<div>

    <br></br>    
<center>
<iframe width="450" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/f94893e9-e673-4e56-810d-36b100bc91e0"></iframe>
</center>

<br></br>
</div>*/}


</div>






);
}
};
