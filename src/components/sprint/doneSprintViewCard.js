import React from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { Link, } from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Photo from "../../assets/images/done-sprint.svg";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
function DoneSprintViewCard() {
  const GreenRadio = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  const [value, setValue] = React.useState("approved");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  //   const handleChange = (event) => {
  //     setSelectedValue(event.target.value);
  //   };

  return (
    <Container>
      <Content>
        <SprintInfo>
          <h1> Sprint Summary:</h1>
          <SprintTime>
            <AccessTimeIcon />
            <span> &nbsp; 2 weeks</span>
          </SprintTime>
          <InfoContainer>
            <h2>Name:&nbsp;</h2>
            <span>Sprint title</span>
          </InfoContainer>
          <InfoContainer>
            <h2>Description:&nbsp; </h2>
            <span>this is the first sprint </span>
          </InfoContainer>
          <InfoContainer>
            <h2>Start Date:&nbsp; </h2>
            <span>6/20/2021</span>
          </InfoContainer>
          <InfoContainer>
            <h2>End Date:&nbsp; </h2>
            <span>6/20/2021</span>
          </InfoContainer>
        </SprintInfo>
        <Image>
          <img src={Photo} alt="" />
        </Image>
      </Content>
      <Table>
        <TableHeader>
          <TR>
            <TH>#</TH>
            <TH>Task</TH>
            <TH>Progress</TH>
            <TH>Time</TH>
            <TH>User</TH>
            <TH>Result</TH>
          </TR>
        </TableHeader>
        <TableContent>
          <TR>
            <TD> 1</TD>
            <TD>Task 1</TD>
            <TD>50</TD>
            <TD>5H</TD>
            <TD>Ali Berro</TD>
            <TD>
              <ApprovedResult>
                <span>Approved</span>
              </ApprovedResult>
            </TD>
          </TR>
          <TR>
            <TD> 1</TD>
            <TD>Task 1</TD>
            <TD>50</TD>
            <TD>5H</TD>
            <TD>Ali Berro</TD>
            <TD>
              <RejectedResult>
                <span>Rejected</span>
              </RejectedResult>
            </TD>
          </TR>
        </TableContent>
      </Table>
    </Container>
  );
}

export default DoneSprintViewCard;
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  padding-top: 10px;
`;
const ApprovedResult = styled.div`
  border: 1px solid black;
  width:100px;
  border-radius: 10px;
  background-color: #66bb6a;
  padding: 3px 20px;
  color: white;
  
`;
const RejectedResult = styled.div`
width:100px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #f50057;
  padding: 3px 20px;
  color: white;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: flex-start;
`;
const Image = styled.div`
  img {
    margin-top: -20px;
    width: 550px;
  }
  @media only screen and (max-width: 1200px) {
    display:none;
  }
`;
const SprintTime = styled.div`
  display: flex;
`;

const SprintInfo = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    color: #757575;
  }
  @media only screen and (max-width: 600px) {
    margin-left: 0px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;

  ${
    "" /* Button{
      width:fit-content;;
  } */
  }

  ${"" /* background-color:red; */}
`;
const Table = styled.table`
  width: 100%;
  ${"" /* background-color:red; */}
`;
const TH = styled.th`
  width: 100%;
  ${"" /* background-color: #3f51b5; */}
  ${"" /* border-right: 1px solid #000000; */}
  font-size: 15px;
  ${"" /* color: white; */}
`;
const TR = styled.tr`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #9e9e9e;
  ${"" /* background-color: #edecee; */}
`;
const TableHeader = styled.div`
  ${"" /* width: 1000px; */}
  position: sticky;
  top: 0;
  z-index: 2;
  border-bottom: 2px solid black;

  ${"" /* background-color:red; */}
`;
const TD = styled.td`
  ${"" /* background-color:black; */}
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${"" /* padding:5px; */}
`;
const TableContent = styled.div`
  width: 100%;
  ${"" /* display:fele */}
  ${"" /* background-color:red; */}
`;

