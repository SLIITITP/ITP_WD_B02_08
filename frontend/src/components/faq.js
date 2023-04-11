import React,{ Component} from 'react';

export default class FAQ extends Component{

    


    render(){
      return(

        <div>
   <div class="accordion accordion-flush" id="accordionFlushExample">
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
</div>
      <div>
    <br></br>    
<center>
<div><iframe width="450" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/f94893e9-e673-4e56-810d-36b100bc91e0"></iframe></div>
</center>
</div>


</div>



);
}
};
