import React from "react";
import styled from "styled-components";
import Photo from "../../assets/images/nosprint.svg";
import ButtonChange from "../btnchange/buttonChange";
import { Link,useParams } from "react-router-dom";
function NoSprintCard() {
  const { id } = useParams();

  return (
    <Container>
      <Header>
        <h1>It's time to create your first sprint !</h1>
        <BtnWrapper>
        <Link to={`/work/${id}/sprint/createSprint`}>
        <ButtonChange />
        </Link>
        </BtnWrapper>
      </Header>

      <Image>
        <img src={Photo} alt="" />
      </Image>
    </Container>
  );
}

export default NoSprintCard;
const Container = styled.div`
  ${"" /* background-color:red; */}
  width:1000px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  ${'' /* background-color: green; */}
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  h1 {
    color: #757575;
  }
  
`;
const BtnWrapper = styled.div`
  margin-left:80px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
  width: 100%;
`;

const Image = styled.div`
  width: fit-content;
  ${"" /* background-color:red; */}
  img {
    width: 600px;
    height: 500px;
  }
`;
