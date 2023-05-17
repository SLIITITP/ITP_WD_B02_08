import React,{ Component} from 'react';
import video1 from '../videos/video1.mp4';
import Background from '../images/background2.jpg';
import Background1 from '../images/background1.jpg';

export default class Gvideos extends Component{

  render() {
    const videoData = [
      { title: "Registration process", url: video1 },
     // { title: "Registration process", url: "https://example.com/video1.mp4" },
      { title: "Payment",  url: video1  },
      { title: "Raise a Ticket", url: video1  },
      { title: "Using the site",  url: video1  },
      { title: "Attend exam", url: video1  },
      { title: "Study materials",  url: video1  },
      { title: "Assigments",  url: video1  }
    ];

    const videoRows = [];

    for (let i = 0; i < videoData.length; i += 3) {
      const videoRow = [];
      for (let j = 0; j < 3 && i + j < videoData.length; j++) {
        const video = videoData[i + j];
        videoRow.push(
          <div key={j} className="video-item">
            <h5 className="video-title">{video.title}</h5>
            <video src={video.url} controls className="video-frame"/>
          </div>
        );
      }
      videoRows.push(<div key={i} className="video-row">{videoRow}</div>);
    }

    return (
      <div className="container">
        <br />
        <center>
              <h3 className="text-3xl font-bold dark:text-white">
                User Guide Videos
              </h3>
            </center>
        <div className="content">
  
          <div className="image-container">
            <img src={ Background} alt="Left" className="left-image" />
          </div>
          <div className="video-container">
      
            {videoRows}
          </div>
        </div>
        <br />
        <br />
        <style>
          {`
               .container {
                background-image: url(${Background1});
                background-size: cover;
                background-position: center;
              }

            .content {
              display: flex;
              align-items: flex-start;
              margin-left: 40px;
              margin-top: 40px;
              gap: 50px;
            }

            .image-container {
              flex-basis: 30%;
            }

            .left-image {
              width: 100%;
            }

            .video-container {
              flex-basis: 70%;
              display: flex;
              flex-wrap: wrap;
            }

            .video-row {
              display: flex;
              flex-basis: 100%;
              justify-content: space-between;
            }

            .video-item {
              flex-basis: 30%;
              padding: 0 10px;
            }

            .video-title {
              color: black;
              font-size: 15px;
              font-weight: bold;
            }

            .video-frame {
              border-radius: 10px;
            }

            .left-image {
              width: 100%; /* Adjust the width as needed */
              max-width: 400px; /* Set a maximum width if desired */
              height: 500px; /* Maintain aspect ratio */
            }
          `}
        </style>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

/*{
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
}*/