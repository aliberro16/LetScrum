import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
import "./project-container.styles.scss";
import Button from "@material-ui/core/Button";
// import SearchBar from "material-ui-search-bar";
import SearchBar from "../../components/search";
const ProjectContainer = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [filteredProject, setfilteredProject] = useState();

  const handleSearch = (newSearchQuery) => {
    setfilteredProject();
    setsearchQuery(newSearchQuery);
    projectData.map((project) => {
      if (project.title === searchQuery) {
        setfilteredProject(project);
        console.log(filteredProject);
      }
    });
  };
  // const onChange = (e) => {
  //   handleSearch(e.target);
  // };

  useEffect(async () => {
    //Grab the project info from db
    setProjectData([]);

    await firestore
      .collection("users")
      .doc(id)
      .collection("projects")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setProjectData((prevData) => [...prevData, doc.data()]);
        });
      });
  }, []);

  const convertTimeStampToDate = (date) => {
    const newDate =
      date.toDate().toLocaleDateString("en-US").toString() +
      "-" +
      date.toDate().toLocaleTimeString("en-US");
    return newDate;
  };

  return (
    <div className="project-container">
      <div className="project-container-banner">
        <h1>Choose Project</h1>
      </div>
      <div className="prject-container-searchBar">
        <SearchBar handleSearch={handleSearch}></SearchBar>
      </div>
      <div className="project-container-listContainer">
      {filteredProject ? (
                <p>{filteredProject.title}</p>
              ) : (
                <div>ERRROR</div>
              )}
        {projectData.map((project) =>
          project ? (
            <>
              
              {console.log(filteredProject)}
              <div className="project-list-container">
                <div className="project-list">
                  <span className="project-container-projectTitle">
                    {project.title.toUpperCase()}
                  </span>
                  <ul>
                    <li>
                      <span>Description:&nbsp;</span>
                      {project.description}
                    </li>
                    <li>
                      <span>Key:&nbsp;</span> {project.key}
                    </li>
                    <li>
                      <span>Members Number:&nbsp;</span>
                      {project.maxMembersNumber}
                    </li>
                    {project.createdAt ? (
                      <li>
                        <span>Creation Date:&nbsp;</span>
                        {convertTimeStampToDate(project.createdAt)}
                      </li>
                    ) : (
                      <li></li>
                    )}
                  </ul>
                </div>
                <div className="project-container-chooseButton">
                  <Button variant="contained" color="primary">
                    Choose Project
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="project-container-noProject">
              NO PROJECTS YET
              {console.log("no project")}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProjectContainer;
