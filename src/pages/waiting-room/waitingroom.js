import React from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import './waitingroom.scss'
import photo from '../../assets/images/waiting room.JPG'
import WarningIcon from '@material-ui/icons/Warning';
function waitingroom() {
  return (
    <div>
      <SideBar />
      <div className="container">
        <div className="content">
          <div className="right-content">
              <h1>Waiting List:</h1>
              <span><WarningIcon/> &nbsp; No Requests!</span>
          </div>
          <div className='left-content'>
              <img src = {photo} alt =""/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default waitingroom;
