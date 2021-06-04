import React from "react";
import TabPanel from "../../components/TabPanel/TabPanel.component";
import styled from "styled-components";
import SideBar from "../../components/side-bar/side-bar.component";

function profile() {
  return (
    <div>
      <SideBar />
      <Container>
        <TabPanel />
      </Container>
    </div>
  );
}

export default profile;
const Container = styled.div`
  margin-left: 72px;
`;
