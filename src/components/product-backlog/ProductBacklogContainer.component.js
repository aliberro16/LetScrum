import React from "react";
import styled from "styled-components";
import img from "../../assets/images/Bg1.jpg";
import BacklogTabPanel from "../../components/product-backlog/BacklogTabPanel.component"
function ProductBacklogContainer(props) {
  //const taskBanner ='Add User Story'


  return (
    <Container>
      <Content>
        <Banner>
          <h1>{props.Banner}</h1>
        </Banner>
        <BacklogTabPanel/>
      </Content>
    </Container>
  );
}

export default ProductBacklogContainer;
const Content = styled.div`
  //  background-color:green;
  //  width:fit-content;
  height: 800px;
  width: 1300px;
  display: flex;
  flex-direction: column;
 // justify-content: flex-end;
`;
const Container = styled.div`
  background-color:black;
  // height:1500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Banner = styled.div`
  // border: 1px solid #000;
  background: url(${img});
  // background-color:grey;
  // background: #2980b9; /* fallback for old browsers */
  // background: -webkit-linear-gradient(to right, #2980b9, #2c3e50); /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to right, #2980b9, #2c3e50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  width: 100%;
  height: 180px;
  // margin-left: -30px;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 750px) {
    height: 150px;
  }
  h1 {
    @media only screen and (max-width: 750px) {
      margin-top: 90px;
    }
    margin-left: 25px;
    font-size: 40px;
  }
`;
