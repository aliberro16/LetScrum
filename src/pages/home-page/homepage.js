import React, { Component } from "react";
import ReactDOM from "react-dom";
import Todocomp from "../../components/todo/Todocomp";
import SideBar from "../../components/side-bar/side-bar.component";
import "./homepage.css";

const HomePage = () => {
  return (
    <div>
      <SideBar />
      <div className ='container'>
      <Todocomp/>
      </div>
    </div>
  );
};

export default HomePage;
