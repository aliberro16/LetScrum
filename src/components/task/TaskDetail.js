import React from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import BacklogTabPanel from "../../components/product-backlog/BacklogTabPanel.component";
import styled from "styled-components";
import img from "../../assets/images/Bg1.jpg";
import ProductBacklogNoProject from "../../components/product-backlog/ProductBacklogNOProjects.component";
import ProductBacklogContainer from "../../components/product-backlog/ProductBacklogContainer.component";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import TaskDetailCard from "./TaskDetailCard"
function TaskDetail(props) {
  return (
    <GeneralContainer>
      <SideBar />
      <Container>
        <Content>
          <Banner>
            <h1>Tasks</h1>
          </Banner>
          <TabWraper>
            <PanelWraper>
              <BacklogTabPanel />
            </PanelWraper>
            <TabConent>
              <TaskDetailCard/>
            </TabConent>
          </TabWraper>
        </Content>
      </Container>
    </GeneralContainer>
  );
}
export default TaskDetail;
const GeneralContainer = styled.div`
  display: flex;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1200px) {
  }
`;
const TabWraper = styled.div`
  display: flex;
  @media only screen and (max-width: 1200px)
    display: flex; 
    justify-content: flex-start;
    // width: fit-content;
  }
`;
const TabConent = styled.div`
  width: 1020px;
  height: 550px;
  align-items: flex-start;
  margin-left:100px;
// margin-right:100px;  
  h1{
      color:#757575;
  }
  Button {
    height: fit-content;
    margin-left: 20px;
  }
  @media only screen and (max-width: 1200px) {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    h1{
        display:none;
    }
  }
  @media only screen and (max-width: 600px) {
    width:100%;
    // margin-right:100px;
  } 
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    width:100%;
    // background-color:black;

  }
`;
const Banner = styled.div`
  background: url(${img});
  width: 100%;
  height: 180px;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  font-size: 26px;
  padding-left: 15px;
  @media only screen and (max-width: 600px) {
    width:440px;
    // background-color:red;
  }
`;
const PanelWraper = styled.div`
  width: fit-content;
  margin-right:20px;
  @media only screen and (max-width: 600px) {
    margin-right:0px;
  }
`;
