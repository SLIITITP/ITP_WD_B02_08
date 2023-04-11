import React,{ Component} from 'react';

export default class Gvideos extends Component{

    


    render(){
      return(

 <div>
<div style={{marginLeft:'40px'}}>
    <h5>Registeration process</h5>
    <video src="https://example.com/video.mp4" controls />
    <br></br>

    <h5>Payment</h5>
    <video src="https://example.com/video.mp4" controls />
    <br></br>

    <h5>Raise a Ticket</h5>
    <video src="https://example.com/video.mp4" controls />
    
    <div>
       
      </div>
    {/*<iframe
        
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ApKKe5iYyRo"
          title="Registration process video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
      />*/}
   </div>
</div>
);
}
};