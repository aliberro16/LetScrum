import React from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import photo from "../../assets/images/productbacklog.svg";
import WarningIcon from "@material-ui/icons/Warning";
// import "./productbacklog.scss";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
function ProductBacklog() {
  return (
    <Container>
      <SideBar />
      <Content>
        <LeftSection>
          <h1>Product Backlog:</h1>
          <br />
          <span>
            <WarningIcon /> &nbsp; You are not joined in any project!
          </span>
          <Btnwraper>
            <CreateButton variant="contained">Create Project</CreateButton>
            <Button variant="contained" color="primary">
              Join Project
            </Button>
          </Btnwraper>
        </LeftSection>
        <RightSection>
          <img src={photo} alt="" />
        </RightSection>
      </Content>
    </Container>
  );
}

export default ProductBacklog;
const CreateButton = styled(Button)`
  background-color: #ff5722 !important;
  color: white !important;
  &:hover {
    background-color: #ff5722;
  }
`;
const Btnwraper = styled.div`
  ${"" /* width: 100%; */}
  height: 100px;
  ${"" /* background-color: red; */}
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    ${'' /* background-color: red;  */}
    @media (max-width: 979px) {
       margin-left:150px
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
