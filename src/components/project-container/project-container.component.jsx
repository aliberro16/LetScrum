import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import './project-container.styles.scss';
import Button from '@material-ui/core/Button';
import Check from '../../assets/icons/check.svg';

const ProjectContainer = () => {
    const initialValue = {
        title: '',
        description: '',
        createdAt: null,
        isChecked: false,
        key: '',
        maxMembersNumber: null,
    };
    const { id } = useParams();
    const [projectData, setProjectData] = useState([]);
    const [chosen, setChosen] = useState([]);
    const [usersId, setUsersId] = useState([]);
    const [checkedProject, setCheckedProject] = useState(initialValue);
    const [memberEmail, setMemberEmail] = useState('');

    const plusData = {
        isChecked: true,
    };

    const handleClick = (i) => {
        const arr = new Array(projectData.length).fill(false);
        const updatedChosenProjects = [...arr];
        updatedChosenProjects[i] = !arr[i];
        setChosen(updatedChosenProjects);
    };

    const uncheckCheckedProject = () => {
        setCheckedProject(initialValue);
    };

    // useEffect(() => {
    //     console.log('hi');
    //     return () => setProjectData([]); // use cleanup to toggle value, if unmounted
    // }, []);
    const getUsersID = async () => {
        const snapshot = await firestore.collection('users').get();
        if (snapshot.empty) {
            console.log('No users found');
            return;
        } else {
            snapshot.forEach((doc) => {
                setUsersId((oldArray) => [...oldArray, doc.id]);
            });
        }
    };

    useEffect(() => {
        searchForTheMembersProjects();
    }, [id, memberEmail]);
    useEffect(() => {
        searchForTheMembersProjects();

        const getTheCheckedProject = async () => {
            const projectRef = firestore
                .collection('users')
                .doc(id)
                .collection('projects');

            projectRef
                .where('isChecked', '==', true)
                .get()
                .then((snapshots) => {
                    if (snapshots.size > 0) {
                        snapshots.forEach((project) => {
                            setCheckedProject(project.data());
                        });
                    }
                });
        };

        const getMemberEmail = async () => {
            await firestore
                .collection('users')
                .doc(id)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        setMemberEmail(doc.data().email);
                    }
                });
        };

        const getData = () => {
            firestore
                .collection('users')
                .doc(id)
                .collection('projects')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setProjectData((prevData) => [...prevData, doc.data()]);
                    });
                });
        };

        getMemberEmail();
        getTheCheckedProject();
        getData();

        return () => setProjectData([]); // use cleanup to toggle value, if unmounted
    }, []);

    const convertTimeStampToDate = (date) => {
        const newDate =
            date.toDate().toLocaleDateString('en-US').toString() +
            '-' +
            date.toDate().toLocaleTimeString('en-US');
        return newDate;
    };

    const searchForTheMembersProjects = async () => {
        // eslint-disable-next-line array-callback-return
        firestore
            .collection('users')
            .get()
            .then((snapShots) => {
                snapShots.forEach((user) => {
                    const projectRef = firestore
                        .collection('users')
                        .doc(user.id)
                        .collection('projects');

                    projectRef.get().then((snapShots) => {
                        snapShots.forEach((doc) => {
                            console.log(doc.id, '=>', doc.data().title);

                            projectRef
                                .doc(doc.id)
                                .collection('members')
                                .where('isPending', '==', false)
                                .where('email', '==', memberEmail)
                                .get()
                                .then((snapshots) => {
                                    snapshots.forEach((docc) => {
                                        console.log(docc.data());
                                        docc.ref.parent.parent
                                            .get()
                                            .then((dc) => {
                                                if (dc.exists) {
                                                    setProjectData(
                                                        (prevData) => [
                                                            ...prevData,
                                                            dc.data(),
                                                        ]
                                                    );
                                                }
                                            });
                                    });
                                });
                        });
                    });
                });
            });
    };

    const addIsCheckedToProjectDoc = (int) => {
        // setAllProjectsNotChecked();
        const projectRef = firestore
            .collection('users')
            .doc(id)
            .collection('projects');

        projectRef
            .where('createdAt', '==', projectData[int].createdAt)
            .get()
            .then((snapshots) => {
                if (snapshots.size > 0) {
                    snapshots.forEach((project) => {
                        const finalProjectData = {
                            ...projectData[int],
                            ...plusData,
                        };
                        projectRef
                            .doc(project.id)
                            .set(finalProjectData, { merge: true });
                        console.log('DONE');
                    });
                } else {
                    console.log('failed');
                }
            });
    };

    const setAllProjectsNotChecked = async () => {
        const projectRef = firestore
            .collection('users')
            .doc(id)
            .collection('projects');

        projectRef
            .where('isChecked', '==', true)
            .get()
            .then((snapshots) => {
                if (snapshots.size > 0) {
                    snapshots.forEach((project) => {
                        projectRef
                            .doc(project.id)
                            .set({ isChecked: false }, { merge: true });
                        console.log(
                            'all projects doc are not checked Successfully'
                        );
                    });
                }
            });
    };

    return (
        <>
            {projectData.length > 0 ? (
                <div className='project-container'>
                    <div className='project-container-banner'>
                        <h1>Choose Project</h1>
                    </div>

                    <div>
                        {projectData.map((project, index) =>
                            project ? (
                                <div key={index}>
                                    <div className='project-container-listContainer'>
                                        <div className='project-list-container'>
                                            <div className='project-list'>
                                                <span className='project-container-projectTitle'>
                                                    {project.title.toUpperCase()}
                                                </span>
                                                <ul>
                                                    <li>
                                                        <span>
                                                            Description:&nbsp;
                                                        </span>
                                                        {project.description}
                                                    </li>
                                                    <li>
                                                        <span>Key:&nbsp;</span>{' '}
                                                        {project.key}
                                                    </li>
                                                    <li>
                                                        <span>
                                                            Members
                                                            Number:&nbsp;
                                                        </span>
                                                        {
                                                            project.maxMembersNumber
                                                        }
                                                    </li>
                                                    {project.createdAt ? (
                                                        <li>
                                                            <span>
                                                                Creation
                                                                Date:&nbsp;
                                                            </span>
                                                            {convertTimeStampToDate(
                                                                project.createdAt
                                                            )}
                                                        </li>
                                                    ) : (
                                                        <li></li>
                                                    )}
                                                </ul>
                                            </div>
                                            <div
                                                className='project-container-chooseButton'
                                                key={index}
                                            >
                                                {chosen[index] ||
                                                checkedProject.title.valueOf() ===
                                                    project.title.valueOf() ? (
                                                    <button
                                                        style={{
                                                            border: 'none',
                                                            backgroundColor:
                                                                'white',
                                                        }}
                                                    >
                                                        <img
                                                            src={Check}
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                            }}
                                                            alt='chosen project'
                                                        />
                                                    </button>
                                                ) : (
                                                    <div className='choose-btn'>
                                                        <Button
                                                            variant='contained'
                                                            color='primary'
                                                            key={index}
                                                            onClick={() => {
                                                                handleClick(
                                                                    index
                                                                );
                                                                setAllProjectsNotChecked().then(
                                                                    () => {
                                                                        addIsCheckedToProjectDoc(
                                                                            index
                                                                        );
                                                                        uncheckCheckedProject();
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            Choose Project
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='project-container-noProject'>
                                    NO PROJECTS YET
                                    {console.log('no project')}
                                </div>
                            )
                        )}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default ProjectContainer;
