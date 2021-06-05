import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
import "./project-container.styles.scss";
import Button from "@material-ui/core/Button";
const ProjectContainer = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState([]);

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
      <div className="project-container-listContainer">
        {projectData.map((project) =>
          project ? (
            <div className="project-list-container">
            <div className="project-list">
              <span className ="project-container-projectTitle">{project.title.toUpperCase()}</span>
              <ul>
                <li><span>Description:&nbsp;</span>{project.description}</li>
                <li><span>Key:&nbsp;</span> {project.key}</li>
                <li><span>Members Number:&nbsp;</span>{project.maxMembersNumber}</li>
                {project.createdAt ? (
                  <li><span>Creation Date:&nbsp;</span>{convertTimeStampToDate(project.createdAt)}</li>
                ) : (
                  <li></li>
                )}
              </ul>
            </div>
              <div>
                <Button variant="contained" color="primary">
                  Primary
                </Button>
              </div>
            </div>
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
