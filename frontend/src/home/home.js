import React from "react";
import BannerBackground from "../assets/home-banner-background.png";
import BannerImage from "../assets/home-banner-image.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Logo from '../assets/download.png';
import { FiArrowRight } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Home = () => {
  return (

    <>

<div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Education is one thing no one can take away from you
          </h1>
          <p className="primary-text">
            Thilina Educational Institute - Hanwella
          </p>
          <button className="secondary-button">
            Explore Here <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>

<Footer/>
    </div>

    
    </>
    


  );
};

export default Home;