import React, { Component, useEffect, useState } from "react";
import Todocomp from "../../components/todo/Todocomp";
import SideBar from "../../components/side-bar/side-bar.component";
import "./homepage.css";
import CardInfo from "../../components/card/HomeCard.component";
import styled from "styled-components";
import { firestore } from "../../firebase/firebase.utils";
import { useParams } from "react-router";
const HomePage = () => {
  const { id } = useParams();
  const [chosenProjectData, setChosenProjectData] = useState({});
  const getChosenProject = async (uid) => {
    const projectRef = firestore
      .collection("users")
      .doc(uid)
      .collection("projects");

    await projectRef
      .where("isChecked", "==", true)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((project) => {
            setChosenProjectData(project.data());
          });
        } else {
          console.log("error");
        }
      });
  };
  useEffect(() => {
    setChosenProjectData({});
    getChosenProject(id);
  }, []);

  return (
    <div>
      <SideBar />
      <Container>
        <div className="card-info">
          <CardInfo />
        </div>
        <div className="todo-container">
          <Todocomp />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
const Container = styled.div`
  margin-left: 75px;
  display: flex;
`;
