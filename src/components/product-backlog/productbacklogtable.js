import React from "react";
import styled from "styled-components";
import ProductBacklogCard from "./ProductbacklogCard";
function ProductBacklogTable() {
  return (
    <Container>
      <Table>
        <TableHeader>
          <TR>
            <TH>TODO</TH>
            <TH>Doing</TH>
            <TH>Done</TH>
          </TR>
        </TableHeader>
        <TableContent>
          <TR>
            <TD>
              <ProductBacklogCard />
            </TD>
            <TD></TD>
            <TD></TD>
          </TR>
          <TR>
            <TD>
              <ProductBacklogCard />
            </TD>
            <TD></TD>
            <TD></TD>
          </TR>
          <TR>
            <TD>
              <ProductBacklogCard />
            </TD>
            <TD></TD>
            <TD></TD>
          </TR>
        </TableContent>
      </Table>
    </Container>
  );
}

export default ProductBacklogTable;
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
