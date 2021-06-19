import React from "react";
import styled from "styled-components";
import SprintBacklogCard from "./sprintBacklogCard";
import { Link } from "react-router-dom";
function SprintBacklogTable() {
  return (
    <Container>
      <Table>
        <TableHeader>
          <TR>
            <TH>TODO</TH>
            <TH>DOING</TH>
            <TH>DONE</TH>
          </TR>
        </TableHeader>
        <TableContent>
          <TR>
            <TD>
            <Link to ="/work/:id/sprint/taskDetail">
              <SprintBacklogCard />
            </Link>
            </TD>
            <TD></TD>
            <TD></TD>
          </TR>
          <TR>
            <TD>
              <SprintBacklogCard />
            </TD>
            <TD></TD>
            <TD></TD>
          </TR>
          <TR>
            <TD>
              <SprintBacklogCard />
            </TD>
            <TD></TD>
            <TD></TD>
          </TR>
        </TableContent>
      </Table>
    </Container>
  );
}

export default SprintBacklogTable;
const Container = styled.div`
  width: 100%;

  ${"" /* background-color:red; */}
`;
const Table = styled.table`
  width: 100%;
  ${"" /* background-color:red; */}
`;
const TH = styled.th`
  width: 100%;
  background-color: #3f51b5;
  border-right: 1px solid #000000;
  font-size: 30px;
  color: white;
`;
const TR = styled.tr`
  display: flex;
  justify-content: space-around;
  background-color: #edecee;
`;
const TableHeader = styled.div`
  width: 1000px;
  position: sticky;
  top: 0;
  z-index: 2;

  ${"" /* background-color:red; */}
`;
const TD = styled.td`
  ${"" /* background-color:black; */}
  width:100%;
`;
const TableContent = styled.div`
  width: 1000px;
  ${"" /* display:fele */}
  ${"" /* background-color:red; */}
`;
