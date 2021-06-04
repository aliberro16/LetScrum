import React from "react";
import styled from "styled-components";
import SideBar from "../../components/side-bar/side-bar.component";
import bannerimg from "../../assets/images/Bg1.jpg";
import detailimg from "../../assets/images/detail.svg";
import photo from "../../assets/images/img_avatar.png";
import Button from "@material-ui/core/Button";
import "./project-detail.scss";
function projectDetail() {
  return (
    <div className="container">
      <SideBar></SideBar>
      <div className="banner">
        <h1>Project Detail</h1>
      </div>
      <div className="content">
        <div className="projectDetail-leftSection">
          <div className="details">
            <div className="detail-info">
              <h2>Title:</h2>
              <span>FYP</span>
            </div>
            <div className="detail-info">
              <h2>Description:</h2>
              <span>final year project</span>
            </div>
            <div className="detail-info">
              <h2>Topic:</h2>
              <span>letscrum</span>
            </div>
            <div className="detail-info">
              <h2>Start Date:</h2>
              <span>6/1/2021</span>
            </div>
            <div className="detail-info">
              <h2>Size:</h2>
              <span>4</span>
            </div>
            <div className="detail-info">
              <h2>Project Key:</h2>
              <span>sfesdafgdsgtfdhfgdfgdwetsdfvdbzzxcvxxfdg</span>
            </div>
            <div className="detail-info">
              <h2>Status:</h2>
              <span>active</span>
            </div>
          </div>
        </div>
        <div className="projectDetail-right-section">
          <div className="projectDetail-member">
            <div className="projectDetail-member-wrapper">
              <div className="projectDetail-member-img">
                <img src={photo} alt="" />
              </div>
              <div className="projectDetail-member-info">
                <div className="projectDetail-member-info-post">
                  <span>Supervisor</span>
                </div>
                <div className="projectDetail-member-info-wrapper">
                  <span>Dr.George bader</span>
                  <span>Bader.g@hotmail.com</span>
                </div>
              </div>
            </div>
            <div className="projectDetail-btnWrapper">
              <Button variant="contained" color="primary">
                make scrum master
              </Button>
              <Button variant="contained" color="secondary">
                Remove
              </Button>
            </div>
          </div>
          <div className="projectDetail-member">
            <div className="projectDetail-member-wrapper">
              <div className="projectDetail-member-img">
                <img src={photo} alt="" />
              </div>
              <div className="projectDetail-member-info">
                <div className="projectDetail-member-info-post">
                  <span>Supervisor</span>
                </div>
                <div className="projectDetail-member-info-wrapper">
                  <span>Dr.George bader</span>
                  <span>Bader.g@hotmail.com</span>
                </div>
              </div>
            </div>
            <div className="projectDetail-btnWrapper">
              <Button variant="contained" color="primary">
              make scrum master
              </Button>
              <Button variant="contained" color="secondary">
              Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default projectDetail;
