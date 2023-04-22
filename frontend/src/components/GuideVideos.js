import React,{ Component} from 'react';

export default class Gvideos extends Component{

  render() {
    const videoData = [
      { title: "Registration process", url: "https://example.com/video1.mp4" },
      { title: "Payment", url: "https://example.com/video2.mp4" },
      { title: "Raise a Ticket", url: "https://example.com/video3.mp4" },
      { title: "Using the App", url: "https://example.com/video4.mp4" },
      { title: "Customizing Settings", url: "https://example.com/video5.mp4" },
      { title: "Advanced Features", url: "https://example.com/video6.mp4" }
    ];

    const rows = [];

    for (let i = 0; i < videoData.length; i += 3) {
      const row = [];
      for (let j = 0; j < 3 && i+j < videoData.length; j++) {
        const video = videoData[i+j];
        row.push(
          <div key={j} className="flex-1 px-2">
            <h5>{video.title}</h5>
            <video src={video.url} controls />
          </div>
        );
      }
      rows.push(<div key={i} className="flex">{row}</div>);
    }

    return (
      <div>
        <center>
          <h3 className="text-3xl font-bold dark:text-white" style={{ marginLeft: '20px' }}>
            User Guide Videos
          </h3>
        </center>
        <div style={{ marginLeft: '40px' }}>
          {rows}
        </div>
      </div>
    );
  }
}
    

{/*
    render(){
      return(

 <div>

<br></br>
        <div>
      <center><h3 className="text-3xl font-bold dark:text-white" style={{marginLeft:'20px'}}> User Guide Videos </h3></center>
      </div>
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
      />
   </div>
</div>

);
}
};
*/}