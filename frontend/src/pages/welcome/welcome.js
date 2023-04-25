import React from "react";
import Styles from "../welcome/welcome.module.css";
import { Link } from "react-router-dom";
function WelcomePage() {
  return (
    <div>
      <div className={Styles.mainCoantainer}>
        <div className={Styles.leftSide}>
          {/* <img className={Styles.imageSet} src={path} alt="" srcset="" /> */}
        </div>
        <div className={Styles.rightSide}>
          <div className={Styles.selectionBlock}>
            <div className={Styles.detailBox}>
              <h1 className={Styles.headingTitle}>Welcome to Thilina Institute</h1>
              <h3 className={Styles.subHead}>choose your destination</h3>
              <br></br>
              <div className={Styles.btnContainer}>
                <Link className={Styles.btnContentInside} to="/plogin">
                  <button className={Styles.btnContent}  >login as User</button>
                </Link>
                <br></br>
                <Link className={Styles.btnContentInside}  to="/pteacherLogin">
                  <button className={Styles.btnContent}>
                    login as Teacher
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
