import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
import "./project-container.styles.scss";
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
      <div>
        {projectData.map((project) =>
          project ? (
            <div className="project-list">
              <p>{project.title}</p>
              <ul>
                <li>{project.description}</li>
                <li>{project.key}</li>
                <li>{project.maxMembersNumber}</li>
                {project.createdAt ? (
                  <li>{convertTimeStampToDate(project.createdAt)}</li>
                ) : (
                  <li></li>
                )}
              </ul>
            </div>
          ) : (
            <div>NO PROJECTS YET</div>
          )
        )}
      </div>
    </div>
  );
};

export default ProjectContainer;
