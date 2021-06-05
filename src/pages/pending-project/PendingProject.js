import React from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import photo from "../../assets/images/pending.svg";
import WarningIcon from "@material-ui/icons/Warning";
// import "./productbacklog.scss";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
function PendingProject() {
  return (
    <div>
      <Container>
        <SideBar />
        <Content>
          <LeftSection>
          <Header>
            <h1>Pending</h1>
            <br />
            <span>
              You are not a member in this project yet, you have to wait until
              the product owner accepts your request.
            </span>
          </Header>
            <PendingSection>
              <h2>Pending Projects:</h2>
              <ul>
                <li>FYP</li>
                <li>Mobile project</li>
                <li>Yelp camp</li>
              </ul>
            </PendingSection>
          </LeftSection>
          <RightSection>
            <img src={photo} alt="" />
          </RightSection>
        </Content>
      </Container>
    </div>
  );
}

export default PendingProject;
const Header = styled.div`
  margin-bottom:30px;
`;
const PendingSection = styled.div`
  ${"" /* width: 100%; */}
  height: 100px;
  ${"" /* background-color: red; */}
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  min-width: 300px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1350px;
  height: 600px;
  margin-top: 100px;
  ${"" /* background-color: red;  */}
  @media (max-width: 979px) {
    margin-left: 150px;
  }
`;

const LeftSection = styled.div`
  width: 50%;
  ${"" /* background-color: green; */}
  margin-top: 100px;
  margin-left: 80px;
  span {
    display: flex;
    align-items: center;
    font-size:20px;
    ${"" /* color:grey; */}
`;

const RightSection = styled.div`
  margin-top: 100px;
  margin-left: 200px;
  margin-right:50px;
  img{
    width: 600px;
  }
  @media (max-width: 979px) {
    img { 
        display: none;
    }
`;
