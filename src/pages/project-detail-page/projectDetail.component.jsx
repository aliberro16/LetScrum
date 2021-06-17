import React, { useEffect, useState } from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import photo from "../../assets/images/img_avatar.png";
import Button from "@material-ui/core/Button";
import "./project-detail.scss";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
import Avatar from "@material-ui/core/Avatar";

function ProjectDetail() {
  const initialValue = {
    title: "",
    description: "",
    createdAt: null,
    isChecked: false,
    key: "",
    maxMembersNumber: null,
  };

  const memberInitial = {
    displayName: "",
    email: "",
    isPending: false,
    isScrumMaster: false,
    phoneNumber: "",
  };
  const { id } = useParams();
  const [checkedProject, setCheckedProject] = useState(initialValue);
  const [productOwnerData, setProductOwnerData] = useState({});
  const [checkedProjectId, setCheckedProjectId] = useState();
  const [membersData, setMembersData] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [scrumMaster, setScrumMaster] = useState(memberInitial);
  const [memberEmail, setMemberEmail] = useState("");

  const getTheCheckedProject = async () => {
    const projectRef = firestore
      .collection("users")
      .doc(id)
      .collection("projects");

    projectRef
      .where("isChecked", "==", true)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((project) => {
            setCheckedProjectId(project.id);
            setCheckedProject(project.data());
          });
        } else {
          return;
        }
      });
  };

  const convertTimeStampToDate = (date) => {
    const newDate =
      date.toDate().toLocaleDateString("en-US").toString() +
      "-" +
      date.toDate().toLocaleTimeString("en-US");
    return newDate;
  };

  const handleClick = (i) => {
    const arr = new Array(membersData.length).fill(false);
    const updatedChosenMembers = [...arr];
    updatedChosenMembers[i] = !arr[i];
    setChosen(updatedChosenMembers);
    console.log(updatedChosenMembers);
  };

  const getProductOwnerData = async () => {
    await firestore
      .collection("users")
      .doc(id)
      .get()
      .then((snapShot) => {
        if (snapShot.exists) {
          setProductOwnerData(snapShot.data());
        } else {
          console.log("error");
        }
      });
  };

  useEffect(() => {
    setMembersData(memberInitial);
    getTheCheckedProject();
    getProductOwnerData();
    getMembersData(id, checkedProjectId);
    getScrumMasterData(id, checkedProjectId);
  }, [checkedProjectId]);

  useEffect(() => {
    getMembersData(id, checkedProjectId);
  }, []);

  const getMembersData = async (uid, pid) => {
    await firestore
      .collection("users")
      .doc(uid)
      .collection("projects")
      .doc(pid)
      .collection("members")
      .where("isPending", "==", false)
      .get()
      .then((querySnapshot) => {
        setMembersData([]);
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            setMembersData((prevData) => [...prevData, doc.data()]);
          } else {
            console.log("no members yet!");
          }
        });
      });
  };
  const getScrumMasterData = (uid, pid) => {
    const memberRef = firestore
      .collection("users")
      .doc(uid)
      .collection("projects")
      .doc(pid)
      .collection("members");

    memberRef
      .where("isScrumMaster", "==", true)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((member) => {
            setScrumMaster(member.data());
          });
        }
      });
  };
  const updateIsScrumMaster = (int) => {
    const memberRef = firestore
      .collection("users")
      .doc(id)
      .collection("projects")
      .doc(checkedProjectId)
      .collection("members");

    memberRef
      .where("email", "==", membersData[int].email)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((member) => {
            memberRef.doc(member.id).update({ isScrumMaster: true });
            console.log("Member is now Scrum Master ");
          });
        } else {
          console.log("failed");
        }
      });
  };

  const setAllMembersNotChecked = async () => {
    const memberRef = firestore
      .collection("users")
      .doc(id)
      .collection("projects")
      .doc(checkedProjectId)
      .collection("members");

    memberRef
      .where("isScrumMaster", "==", true)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((member) => {
            memberRef
              .doc(member.id)
              .set({ isScrumMaster: false }, { merge: true });
            console.log(" scrum master doc is not checked Successfully");
          });
        }
      });
  };
  const removeMemberFromFirestore = (memberEmail) => {
    const memberRef = firestore
      .collection("users")
      .doc(id)
      .collection("projects")
      .doc(checkedProjectId)
      .collection("members");

    memberRef
      .where("email", "==", memberEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            setMemberEmail(doc.data().email);
            memberRef
              .doc(doc.id)
              .delete()
              .then(() => console.log("done deleting member from firestore"));
          } else {
            console.log("no members yet!");
          }
        });
      });
  };
  const uncheckScrumMaster = () => {
    setScrumMaster(memberInitial);
  };

  return (
    <div className="project-detail-container">
      <SideBar></SideBar>
      <div className="project-detail-banner">
        <h1>Project Detail</h1>
      </div>
      <div className="project-detail-content">
        <div className="projectDetail-leftSection">
          <div className="details">
            <div className="detail-info">
              <h2>Title:</h2>
              <span style={{ textTransform: "uppercase" }}>
                {checkedProject.title}
              </span>
            </div>
            <div className="detail-info">
              <h2>Description:</h2>
              <span>{checkedProject.description}</span>
            </div>
            <div className="detail-info">
              <h2>Start Date:</h2>
              <span>
                {checkedProject.createdAt
                  ? convertTimeStampToDate(checkedProject.createdAt)
                  : ""}
              </span>
            </div>
            <div className="detail-info">
              <h2>Size:</h2>
              <span>{checkedProject.maxMembersNumber}</span>
            </div>
            <div className="detail-info">
              <h2>Project Key:</h2>
              <span>{checkedProject.key}</span>
            </div>
            <div className="detail-info">
              <h2>Status:</h2>
              <span>active</span>
            </div>
          </div>
        </div>
        <div className="projectDetail-right-section">
          <div className="projectDetail-member">
            <div className="projectDetail-member-wrapper">
              <div className="projectDetail-member-img">
                <Avatar style={{ backgroundColor: "#ff5722" }}>
                  {productOwnerData.displayName
                    ? productOwnerData.displayName.charAt(0).toUpperCase()
                    : ""}
                </Avatar>
              </div>
              <div className="projectDetail-member-info">
                <div className="projectDetail-member-info-post">
                  <span>Supervisor</span>
                </div>
                <div className="projectDetail-member-info-wrapper">
                  <span style={{ textTransform: "uppercase" }}>
                    {productOwnerData.displayName}
                  </span>
                  <span>{productOwnerData.email}</span>
                </div>
              </div>
            </div>
          </div>

          {membersData.length > 0 ? (
            membersData.map((member, index) => (
              <div className="projectDetail-member" key={index}>
                <div className="projectDetail-member-wrapper">
                  <div className="projectDetail-member-img">
                    <Avatar style={{ backgroundColor: "#ff5722" }}>
                      {member.displayName
                        ? member.displayName.charAt(0).toUpperCase()
                        : ""}
                    </Avatar>{" "}
                  </div>
                  <div className="projectDetail-member-info">
                    {chosen[index] ||
                    scrumMaster.email.valueOf() === member.email.valueOf() ? (
                      <div className="projectDetail-member-info-post2">
                        <span>Scrum Master</span>
                      </div>
                    ) : (
                      <div className="projectDetail-member-info-post1">
                        <span>Member</span>
                      </div>
                    )}
                    <div className="projectDetail-member-info-wrapper">
                      <span style={{ textTransform: "uppercase" }}>
                        {member.displayName}
                      </span>
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
                {chosen[index] ||
                scrumMaster.email.valueOf() === member.email.valueOf() ? (
                  <div className="projectDetail-btnWrapper">
                    <Button variant="contained" color="secondary">
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="projectDetail-btnWrapper" key={index}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleClick(index);
                        setAllMembersNotChecked().then(() => {
                          uncheckScrumMaster();
                          updateIsScrumMaster(index);
                          //window.location.reload();
                        });
                      }}
                    >
                      make scrum master
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeMemberFromFirestore(member.email)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
