import React from 'react'
import styled from 'styled-components';
import { Link, useParams } from "react-router-dom";

function SprintTabPanel() {

    const [activeIndex, setActiveIndex] = React.useState(0);
    const tabArray = ["CurrentSprint", "DoneSprint"];
    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
      };
    return (
        <Container>
        <Content>
          <LeftSection>
            <Header>
              <h1>Menu</h1>
            </Header>
            <div>
              {tabArray.map((tab, index) => (
                <div>
                  <Link to={`/work/:id/sprint/${tab}`}>
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
    )
}

export default SprintTabPanel;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  // background-color:red;
  width: 250px;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Tab = styled.div`
  border-top: 1px solid #757575;
  padding: 10px;
  
  cursor: pointer;
  span {
    color: black;
  }
  :hover{
   border-left: 3px solid #ff5722
  }
`;

const Header = styled.div`
  border-bottom: 3px solid #757575;
  width: 250px;
  padding: 5px;
`;
const LeftSection = styled.div``;
const RightSection = styled.div``;

