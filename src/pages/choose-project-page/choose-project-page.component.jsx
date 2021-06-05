import React from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import ProjectContainer from "../../components/project-container/project-container.component";

const ChooseProjectPage = () => {
  return (
    <div>
      <div>
        <SideBar />
      </div>
      <ProjectContainer></ProjectContainer>
    </div>
  );
};
export default ChooseProjectPage;
