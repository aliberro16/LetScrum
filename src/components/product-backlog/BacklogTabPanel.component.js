import React from "react";
import styled from "styled-components";
import img from "../../assets/images/Bg1.jpg";
import "./BacklogTabPanel.scss";
import { Link, useParams } from 'react-router-dom';


const BacklogTabPanel = () => {
  //const taskBanner ='Add User Story'

  const [activeIndex, setActiveIndex] = React.useState(0);
  const tabArray = ["Product Backlog", "User Story", "Task"];

  const handleOnClick = (index) => {
    setActiveIndex(index); // remove the curly braces
  };


  React.useEffect(() => {
    console.log(activeIndex);
  }, []);

  return (
    <Container>
      <Content>
        <LeftSection>
          <Header>
            <h2>Menu</h2>
          </Header>
          <div>
            {tabArray.map((tab, index) => (
              <div>
              <Link to={`/work/project/${tab}`}>
                <Tab
                  key={index}
                  onClick={() => handleOnClick(index)}
                  className={activeIndex === index ? "active" : "unactive"}
                >
                  <span>{tab}</span>
                </Tab>
                </Link>
              </div>
            ))}
          </div>
        </LeftSection>
      </Content>
    </Container>
  );
};

export default BacklogTabPanel;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  // background-color:red;
  width: 200px;
`;

const Tab = styled.div`
  border-top: 1px solid #000000;
  padding: 10px;
  cursor: pointer;
  span{
    color:black;
  }
`;

const Header = styled.div`
  border-bottom: 3px solid #000000;
  width: 200px;
  padding: 5px;
`;
const LeftSection = styled.div``;
const RightSection = styled.div``;

