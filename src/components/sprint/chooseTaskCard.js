import React from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {Link,useParams} from "react-router-dom";
function ChooseTaskCard() {
  const { id } = useParams();

  return (
    <Container>
      <Table>
        <TableHeader>
          <TR>
            <TH>#</TH>
            <TH>Project</TH>
            <TH>Story</TH>
            <TH>Task</TH>
            <TH>Progress</TH>
          </TR>
        </TableHeader>
        <TableContent>
          <TR>
            <TD>
              <Checkbox color="primary" />
            </TD>
            <TD>FYP</TD>
            <TD>Story title</TD>
            <TD>Task title</TD>
            <TD>-1</TD>
          </TR>
          <TR>
            <TD>
              <Checkbox color="primary" />
            </TD>
            <TD>FYP</TD>
            <TD>Story title</TD>
            <TD>Task title</TD>
            <TD>-1</TD>
          </TR>
          <TR>
            <TD>
              <Checkbox color="primary" />
            </TD>
            <TD>FYP</TD>
            <TD>Story title</TD>
            <TD>Task title</TD>
            <TD>-1</TD>
          </TR>
        </TableContent>
      </Table>
      <BtnWraper>
      <Link to = {`/work/${id}/sprint/choosemember`}>
      <Button variant="contained" color="primary" size="meduim">
        Next
      </Button>{" "}
      </Link>
      </BtnWraper>
    </Container>
  );
}

export default ChooseTaskCard;
const Container = styled.div`
  width: 100%;
  display:flex;
  flex-direction:column;

  ${'' /* Button{
      width:fit-content;;
  } */}
  

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
const BtnWraper = styled.div`
  ${'' /* width: 100%; */}
  ${"" /* display:fele */}
 ${'' /* background-color:red; */}
  margin-top:15px;
  width:100%;
  display:flex;
  justify-content:flex-end;
  
`;