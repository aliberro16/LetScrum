import React from "react";
import SideBar from "../side-bar/side-bar.component";
import SprintTabPanel from "./sprintTabPanel";
import styled from "styled-components";
import img from "../../assets/images/Bg1.jpg";
import ProductBacklogNoProject from "../product-backlog/ProductBacklogNOProjects.component";
import ProductBacklogContainer from "../product-backlog/ProductBacklogContainer.component";
import Button from "@material-ui/core/Button";
import ProductBacklogTable from "../product-backlog/productbacklogtable";
import NoSprint from "./noSprintCard";
import CreateSprintCard from "../../components/sprint/createSprintCard";
import EditTaskCard from "./editTaskCard";

function EditTaskPage() {
  return (
    <GeneralContainer>
      <SideBar />
      <Container>
        <Content>
          <Banner>
            <h1>Sprint</h1>
          </Banner>
          <TabWraper>
            <PanelWraper>
              <SprintTabPanel />
            </PanelWraper>
            <TabConent>
              <EditTaskCard/>
            </TabConent>
          </TabWraper>
        </Content>
      </Container>
    </GeneralContainer>
  );
}

export default EditTaskPage;
const GeneralContainer = styled.div`
  display: flex;
 
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1200px) {
    width: 100%;
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
  width: 1100px;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  ${"" /* background-color:red; */}
  Button {
    height: fit-content;
    margin-left: 20px;
  }
  @media only screen and (max-width: 1200px) {
    display: flex;
    width: 100%;
    justify-content: flex-start;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    width: 100%;
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
`;
const PanelWraper = styled.div`
  width: fit-content;
  margin-right: 20px;
  @media only screen and (max-width: 600px) {
    margin-right: 0px;
  }
`;
