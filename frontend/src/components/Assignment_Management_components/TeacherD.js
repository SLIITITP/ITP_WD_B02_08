
import React from 'react';
import '../../stylesheets/style.css'
import  './script.js' // import the script.js file


const TeacherD = () => {
    return (
        <div>
            <section>
                <div className="side-bar">
                    <div className="logo">
                       
                    </div>

                    <div className="links">


                        <div className="link">
                            <div className="icon">
                                <i className="fa-solid fa-square"></i>
                            </div>
                            <div className="name" >DashBoard</div>
                        </div>

                        <div className="link">
                            <div className="icon">
                                <i className="fa-solid fa-square"></i>
                            </div>
                            <div className="name">Assignments</div>
                        </div>

                        <div className="link">
                            <div className="icon">
                                <i className="fa-solid fa-square"></i>
                            </div>
                            <div className="name">Reports</div>
                        </div>

                        <div className="link">
                            <div className="icon">
                                <i className="fa-solid fa-square"></i>
                            </div>
                            <div className="name">Feedbacks</div>
                        </div>


                       


                        <div className="link logout">
                            <div className="icon">
                                <i className="fa-solid fa-power-off"></i>
                            </div>
                            <div className="name">Logout</div>
                        </div>


                    </div>
                </div>

                <div className="dashboard" hash="false">
                    <div className="navbar">
                        <span>
                            <button id="true">
                                <i className="fa-solid fa-bars-progress"></i>
                            </button>
                            <h2>DASHBOARD</h2>
                        </span>

                        <div className="search">
                            <input type="search" placeholder="Search..." />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>

                        <div className="nav-btn">
                            <i className="fa-solid fa-bell"></i>
                            <div className="center">
                                <input className="button" type="checkbox" id="checkbtn" />
                            </div>
                            <div className="profile-pic">
                                <img src="./profile.jpeg" />
                            </div>
                        </div>
                    </div>

                    <div className="summary">
                        <div className="box">
                            <div className="top">
                                <div className="left">
                                    <h4>Sales</h4>
                                    <h2>$20 000</h2>
                                </div>

                                <div className="right">
                                    <i className="fa-solid fa-bars-progress"></i>
                                </div>
                            </div>

                            <div className="bottom">
                                <p>High perfomance</p>
                            </div>
                        </div>

                        <div className="box">
                            <div className="top">
                                <div className="left">
                                    <h4>Sales</h4>
                                    <h2>$20 000</h2>
                                </div>

                                <div className="right">
                                    <i className="fa-solid fa-bars-progress"></i>
                                </div>
                            </div>

                            <div className="bottom">
                                <p>High perfomance</p>
                            </div>
                        </div>

                        <div className="box">
                            <div className="top">
                                <div className="left">
                                    <h4>Sales</h4>
                                    <h2>$20 000</h2>
                                </div>

                                <div className="right">
                                    <i className="fa-solid fa-bars-progress"></i>
                                </div>
                            </div>

                            <div className="bottom">
                                <p>High perfomance</p>
                            </div>
                        </div>

                        <div className="box">
                            <div className="top">
                                <div className="left">
                                    <h4>Sales</h4>
                                    <h2>$20 000</h2>
                                </div>

                                <div className="right">
                                    <i className="fa-solid fa-bars-progress"></i>
                                </div>

                            </div>

                            <div className="bottom">
                                <p>High perfomance</p>
                            </div>
                        </div>



                    </div>


                    <div class="page-middle">

                        <div class="sellings">
                            <h2>Sales</h2>
                            <table>
                                <tr>
                                    <th>DATE</th>
                                    <th>CUSTOMER</th>
                                    <th>PRODUCT</th>
                                    <th>TOTAL</th>
                                </tr>

                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>Dell Laptop</td>
                                    <td>$10 000</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>Dell Laptop</td>
                                    <td>$10 000</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>Dell Laptop</td>
                                    <td>$10 000</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>Dell Laptop</td>
                                    <td>$10 000</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>Dell Laptop</td>
                                    <td>$10 000</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>Dell Laptop</td>
                                    <td>$10 000</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>Dell Laptop</td>
                                    <td>$10 000</td>
                                </tr>

                            </table>
                        </div>

                        <div class="orders">
                            <table>
                                <h2>Orders</h2>
                                <tr>
                                    <th>DATE</th>
                                    <th>CUSTOMER</th>
                                    <th>QTY</th>
                                </tr>

                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>02 Feb 2022</td>
                                    <td>V.H.P Perera</td>
                                    <td>50</td>
                                </tr>
                            </table>
                        </div>
                    </div>


                </div>
            </section>

        </div>
    )
}

export default TeacherD;