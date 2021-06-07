import React, { useState,useEffect } from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import photo from "../../assets/images/waiting room.JPG";
import photo2 from "../../assets/images/img_avatar.png";
import WarningIcon from "@material-ui/icons/Warning";
import Button from "@material-ui/core/Button";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import {firestore} from '../../firebase/firebase.utils'
import "./waitingroom.scss";

function waitingroom() {
  

  return (
    <div>
      <SideBar />
      <div className="container">
        <div className="content">
          <div className="waitingroom-leftSection">
            <div className="right-content">
              <div>
                <h1>Waiting List:</h1>
                <span>
                  <WarningIcon /> &nbsp; No Requests!
                </span>
              </div>
            </div>
            <div className="waitingroom-member">
              <div className="waitingroom-avatar-img">
                <img src={photo2} alt="" />
              </div>
              <div className="waitingroom-member-info">
                <span>Ali Berro </span>
                <span>ali.berro16@hotmail.com </span>
              </div>
              <div className="waitingroom-btnwrapper">
                <Button variant="contained" color="primary">
                <DoneIcon/> Accept
                </Button>
                <Button style={{backgroundColor:"#ff5722",color:"white"}} variant="contained">
                  <ClearIcon/> Reject
                </Button>
              </div>
            </div>
          </div>
          <div className="left-content">
            <img src={photo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default waitingroom;
