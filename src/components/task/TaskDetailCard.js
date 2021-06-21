import React from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import BacklogTabPanel from "../../components/product-backlog/BacklogTabPanel.component";
import styled from "styled-components";
import img from "../../assets/images/Bg1.jpg";
import ProductBacklogNoProject from "../../components/product-backlog/ProductBacklogNOProjects.component";
import ProductBacklogContainer from "../../components/product-backlog/ProductBacklogContainer.component";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormInput from "../form-input/form-input.component";
import ComboBox from "../combo-box/ComboBox.component";
import photo from "../../assets/images/detailStory.svg";
export default function TaskDetailCard() {

  return (
    <Container>
      <StoryInfo>
        <h1> Task Details:</h1>
        <InfoContainer>
          <h2>Task:&nbsp;</h2>
          <span>Task title</span>
        </InfoContainer>
        <InfoContainer>
          <h2>User Story:&nbsp; </h2>
          <span>User Story title</span>
        </InfoContainer>
        <InfoContainer>
          <h2>Time:&nbsp; </h2>
          <span>N hours</span>
        </InfoContainer>
        <InfoContainer>
          <h2>Priority:&nbsp; </h2>
          <span>1 to 5</span>
        </InfoContainer>
        <InfoContainer>
          <h2>Points:&nbsp; </h2>
          <span>15</span>
        </InfoContainer>
      </StoryInfo>
      <Image>
        <img src={photo} alt="" />
      </Image>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    diplay:flex;
    justify-content:flex-start;
   
    }
`;
const Image = styled.div`
  img {
    margin-right: 150px;
    width: 500px;
    height: 500px;
  }
  @media only screen and (max-width: 600px) {
 display:none;
  }
  @media only screen and (max-width: 1200px) {
    display:none;
     }
`;

const TaskList = styled.div`
  width: fit-content;
  li {
    color: #3f51b5;
  }
  :hover {
    cursor: pointer;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  @media only screen and (max-width: 600px) {
    margin-left:0px;
  }
`;

