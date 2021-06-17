import React, { useState, useEffect } from "react";
import SideBar from "../../components/side-bar/side-bar.component";
import FormInput from "../../components/form-input/form-input.component";
import Button from "@material-ui/core/Button";
import { firestore } from "../../firebase/firebase.utils";
import { useParams } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import "./join-project.styles.scss";

const JoinProjectPage = () => {
  const [key, setKey] = useState("");
  const { id } = useParams();
  const [userIds, setUsersIds] = useState([]);
  const [memberData, setMemberData] = useState();
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessfull, setSuccess] = useState(null);

  const plusData = {
    isPending: true,
    isScrumMaster: false,
  };

  const handleChange = (e) => {
    const key = e.target.value;
    setKey(key);
  };

  const getUsersIDs = async () => {
    const snapshot = await firestore.collection("users").get(); //
    if (snapshot.empty) {
      console.log("No users found");
      return;
    } else {
      snapshot.forEach((doc) => {
        setUsersIds((oldArray) => [...oldArray, doc.id]);
      });
    }
  };

  useEffect(() => {
    getUsersIDs();
    getMemberInfo(id);
  }, []);

  const getMemberInfo = async (uid) => {
    await firestore
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setMemberData(doc.data());
        } else {
          console.log("No such user document!");
          return;
        }
      });
  };

  const addMemberDocToFirestore = async (memberId, projectId, data) => {
    const memberRef = firestore
      .collection("users")
      .doc(memberId)
      .collection("projects")
      .doc(projectId)
      .collection("members");
    const finalMemberData = { ...data, ...plusData };
    await memberRef.add(finalMemberData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //loop through the users id to check if the project key existsS
    userIds.map(async (userId) => {
      const projectsRef = firestore
        .collection("users")
        .doc(userId)
        .collection("projects");

      projectsRef
        .where("key", "==", key)
        .get()
        .then((snapShot) => {
          if (snapShot.empty) {
            setSuccess(false);
            setError(true);
            setErrorMessage("Key/Project Not Found");
            return;
          } else {
            //userId is the id of the user who owns this project key
            // console.log('user who owns this project:', userId);


            // // setMemberData(getMemberInfo(id));
            // console.log('***********', memberData);
            setSuccess(true);
            setError(false);
            snapShot.forEach((doc) => {
              console.log(doc.id, "=>", doc.data());
              addMemberDocToFirestore(userId, doc.id, memberData)
                .then(() => {
                  alert("member added successfully");
                  setSuccess(true);
                  setError(false);
                })
                .catch((error) => {
                  console.error(error);
                  setError(error);
                  setErrorMessage(error.message);
                });
            });
          }
        });
    });
    setKey("");
    setMemberData();
  };
  return (
    <>
      {/* <div>
                {error ? (
                    <div
                        style={{
                            width: '100%',
                            marginTop: '60px',
                            paddingLeft: '69px',
                            position: 'absolute',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Alert severity='warning'>{errorMessage}</Alert>
                    </div>
                ) : isSuccessfull ? (
                    <div
                        style={{
                            width: '100%',
                            marginTop: '64px',
                            paddingLeft: '69px',
                            position: 'absolute',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Alert severity='success' color='info'>
                            Project added successfully!
                        </Alert>
                    </div>
                ) : null}
            </div> */}
      <div>
        <div>
          <SideBar />
        </div>
        <div className="key-form">
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="key"
              value={key}
              onChange={handleChange}
              label="Project Key"
              required
            />
            <div className="join-btn">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
              >
                JOIN PROJECT
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default JoinProjectPage;
