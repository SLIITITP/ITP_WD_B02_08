import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                <Link className="nav-link" to="/addPayment">Add Payment</Link>
                <Link className="nav-link" to="/getPayment">BBBB</Link>
                <Link className="nav-link" to="">CCCC</Link>
                <Link className="nav-link" to="">DDDD</Link>
                <Link className="nav-link disabled">Disabled</Link>
                <Link className="nav-link" to="/allClasses">Timetable</Link>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Header;