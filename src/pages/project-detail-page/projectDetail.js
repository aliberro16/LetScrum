import React from "react";
import styled from "styled-components";
import SideBar from "../../components/side-bar/side-bar.component";
import bannerimg from "../../assets/images/Bg1.jpg";
import detailimg from "../../assets/images/detail.svg"
import "./project-detail.scss";
function projectDetail() {
  return (
    <div className="container">
    <SideBar>
    </SideBar>
      <div className="banner">
        <h1>Project Detail</h1>
      </div>
      <div className='content'>
        <div className='details'>
            <h2>Title:</h2> 
            <span>FYP</span>
            <h2>Description:</h2>
            <span>final year project</span>
            <h2>Topic:</h2>
            <span>letscrum</span>
            <h2>Start Date:</h2>
            <span>6/1/2021</span>
            <h2>Size:</h2>
            <span>4</span>
            <h2>Project Key:</h2>
            <span>sfesdafgdsgtfdhfgdfgdwet</span>
            <h2>Status:</h2>
            <span>active</span>
        </div>
        <div className="image">
            <img src = {detailimg}/>
        </div>
      </div>
  
    </div>
  );
}

export default projectDetail;
