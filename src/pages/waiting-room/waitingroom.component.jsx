import React, { useState, useEffect } from 'react';
import SideBar from '../../components/side-bar/side-bar.component';
import photo from '../../assets/images/waiting room.JPG';
import photo2 from '../../assets/images/img_avatar.png';
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import './waitingroom.scss';

const WaitingRoom = () => {
    const [checkedProjectId, setCheckedProjectId] = useState();
    const [membersData, setMembersData] = useState([]);
    const [memberEmail, setMemberEmail] = useState('');
    const { id } = useParams();

    const getCheckedProjectId = async (uid) => {
        const projectRef = firestore
            .collection('users')
            .doc(uid)
            .collection('projects');

        await projectRef
            .where('isChecked', '==', true)
            .get()
            .then((snapshots) => {
                if (snapshots.size > 0) {
                    snapshots.forEach((project) => {
                        setCheckedProjectId(project.id);
                    });
                } else {
                    console.log('error');
                }
            });
    };

    useEffect(() => {
        console.log(membersData);
        console.log(memberEmail);
    }, [membersData, memberEmail]);

    useEffect(() => {
        setMembersData([]);
        getCheckedProjectId(id).then(() =>
            getMembersDataFromFirestore(id, checkedProjectId).then(() => {
                console.log(checkedProjectId);
            })
        );
        // Grab the member info from db
    }, [checkedProjectId, memberEmail]);

    const getMembersDataFromFirestore = async (uid, pid) => {
        await firestore
            .collection('users')
            .doc(uid)
            .collection('projects')
            .doc(pid)
            .collection('members')
            .where('isPending', '==', true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        setMembersData((prevData) => [...prevData, doc.data()]);
                    } else {
                        console.log('no members yet!');
                    }
                });
            });
    };

    const acceptMember = async (uid, pid, memberEmail) => {
        const memberRef = firestore
            .collection('users')
            .doc(uid)
            .collection('projects')
            .doc(pid)
            .collection('members');

        await memberRef
            .where('email', '==', memberEmail)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        setMemberEmail(doc.data().email);
                        memberRef.doc(doc.id).update({ isPending: false });
                        console.log('done updating member status');
                    } else {
                        console.log('no members yet!');
                    }
                });
            });
    };
    const rejectMember = async (uid, pid, memberEmail) => {
        const memberRef = firestore
            .collection('users')
            .doc(uid)
            .collection('projects')
            .doc(pid)
            .collection('members');

        await memberRef
            .where('email', '==', memberEmail)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        setMemberEmail(doc.data().email);
                        memberRef
                            .doc(doc.id)
                            .delete()
                            .then(() =>
                                console.log('done deleting member from db')
                            );
                    } else {
                        console.log('no members yet!');
                    }
                });
            });
    };
    return (
        <div>
            <SideBar />
            <div className='container'>
                <div className='content'>
                    <div className='waitingroom-leftSection'>
                        <div className='right-content'>
                            <div>
                                <h1>Waiting List:</h1>
                                <span></span>
                            </div>
                        </div>
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            {membersData.length > 0 ? (
                                membersData.map((member, index) => (
                                    <div
                                        className='waitingroom-member'
                                        key={index}
                                    >
                                        <div className='waitingroom-avatar-img'>
                                            <img src={photo2} alt='' />
                                        </div>
                                        <div className='waitingroom-info-btn'>
                                            <div
                                                className='waitingroom-member-info'
                                                key={index}
                                            >
                                                <span>
                                                    {member.displayName}
                                                </span>
                                                <span>{member.email}</span>
                                            </div>
                                            <div className='waitingroom-btnwrapper'>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    onClick={() =>
                                                        acceptMember(
                                                            id,
                                                            checkedProjectId,
                                                            member.email
                                                        )
                                                    }
                                                >
                                                    <DoneIcon /> Accept
                                                </Button>
                                                <Button
                                                    style={{
                                                        backgroundColor:
                                                            '#ff5722',
                                                        color: 'white',
                                                    }}
                                                    variant='contained'
                                                    onClick={() =>
                                                        rejectMember(
                                                            id,
                                                            checkedProjectId,
                                                            member.email
                                                        )
                                                    }
                                                >
                                                    <ClearIcon /> Reject
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    {' '}
                                    <WarningIcon /> &nbsp; No Requests!
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='left-content'>
                        <img src={photo} alt='' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingRoom;

