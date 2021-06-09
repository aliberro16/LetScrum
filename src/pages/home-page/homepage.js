import React, { Component } from "react";
import ReactDOM from "react-dom";
import Todocomp from "../../components/todo/Todocomp";
import SideBar from "../../components/side-bar/side-bar.component";
import "./homepage.css";
import CardInfo from "../../components/card/HomeCard";
import styled from "styled-components";
const HomePage = () => {
  return (
    <div>
      <SideBar />
      <Container>
        <div>
          <CardInfo />
        </div>
        <div className="container">
          <Todocomp />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
const Container = styled.div`
  margin-left: 75px;
  display: flex;
`;
