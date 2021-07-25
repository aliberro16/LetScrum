import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import ComboBox from '../combo-box/ComboBox.component';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function ChooseMemberCard() {
    let location = useLocation();
    let history = useHistory();
    const { id } = useParams();
    const { sprintId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [memberEmail, setMemberEmail] = useState('');
    const [memData, setMemData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [ind, setIndex] = useState();
    // const arr = [];
    useEffect(() => {
        if (tasks.length !== 0) {
            var member = { member: inputValue };
            var newTask = { ...tasks[ind], ...member };
            console.log(newTask);
            setAssignedTasks((prev) => [...prev, newTask]);
            // assignedTasks.splice(ind, 1, newTask);
            let arr = [...assignedTasks];
            arr[ind] = newTask;
            setAssignedTasks(arr);
        }
        console.log('index => ', ind);
        // console.log('new tasks array => ', array);
    }, [ind, inputValue]);

    useEffect(() => {
        console.log('assigned tasks =>', assignedTasks);
    }, [assignedTasks]);

    useEffect(() => {
        console.log('input value => ', inputValue);
    }, [ind, inputValue]);

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

    const searchForTheMembersProjects = async () => {
        // eslint-disable-next-line array-callback-return
        // usersId.map((userId) => {

        const userRef = firestore.collection('users');
        userRef.get().then((snapshots) => {
            snapshots.forEach((user) => {
                const projectRef = userRef.doc(user.id).collection('projects');

                projectRef.get().then((snapShots) => {
                    snapShots.forEach((doc) => {
                        projectRef
                            .doc(doc.id)
                            .collection('members')
                            .where('email', '==', memberEmail)
                            // .where('isScrumMaster', '==', false)
                            .onSnapshot((snapshots) => {
                                snapshots.forEach((docc) => {
                                    // console.log(docc.data());
                                    // setScrumMaster(true);
                                    docc.ref.parent.parent.get().then((dc) => {
                                        if (dc.exists) {
                                            // console.log(dc.data());
                                            projectRef
                                                .doc(dc.id)
                                                .collection('members')
                                                .get()
                                                .then((memberDocs) => {
                                                    memberDocs.forEach(
                                                        (memDoc) => {
                                                            if (
                                                                !memDoc.data()
                                                                    .isScrumMaster
                                                            ) {
                                                                setMemData(
                                                                    (
                                                                        prevData
                                                                    ) => [
                                                                        ...prevData,
                                                                        memDoc.data(),
                                                                    ]
                                                                );
                                                            }
                                                        }
                                                    );
                                                });
                                        }
                                    });
                                });
                            });
                    });
                });
            });
        });
    };

    const assignTaskToMember = () => {
        assignedTasks.forEach((assignedTask) => {
            const userRef = firestore.collection('users');
            userRef.get().then((snapshots) => {
                snapshots.forEach((user) => {
                    const projectRef = userRef
                        .doc(user.id)
                        .collection('projects');

                    projectRef.get().then((snapShots) => {
                        snapShots.forEach((doc) => {
                            projectRef
                                .doc(doc.id)
                                .collection('members')
                                .where('email', '==', memberEmail)
                                .onSnapshot((snapshots) => {
                                    snapshots.forEach((docc) => {
                                        docc.ref.parent.parent
                                            .get()
                                            .then((dc) => {
                                                if (dc.exists) {
                                                    projectRef
                                                        .doc(dc.id)
                                                        .collection('sprints')
                                                        .doc(sprintId)
                                                        .collection('tasks')
                                                        .add(assignedTask);
                                                }
                                            });
                                    });
                                });
                        });
                    });
                });
            });
        });
    };

    useEffect(() => {
        setMemData([]);
        getMemberEmail();
        searchForTheMembersProjects();
    }, [id, memberEmail]);

    useEffect(() => {
        setTasks(location.task);
        // console.log(tasks);
    }, [tasks]);

    const handleClick = () => {
        assignTaskToMember();
    };

    return (
        <Container>
            <Table>
                <TableHeader>
                    <TR>
                        <TH>#</TH>
                        <TH>Task</TH>
                        <TH>Time</TH>
                        <TH>Progress</TH>
                        <TH>User</TH>
                    </TR>
                </TableHeader>
                <TableContent>
                    {tasks.length > 0 ? (
                        tasks.map((task, i) => (
                            <TR key={i}>
                                <TD>{i + 1}</TD>
                                <TD>{task.task}</TD>
                                <TD>{task.time}</TD>
                                <TD>{task.progress}</TD>
                                <TD>
                                    <Autocomplete
                                        id='combo-box-Member'
                                        style={{ width: 200 }}
                                        options={memData}
                                        getOptionLabel={(option) =>
                                            option.displayName
                                        }
                                        // onChange={handleChange(i,)}
                                        onInputChange={(
                                            event,
                                            newInputValue
                                        ) => {
                                            setInputValue(newInputValue);
                                            setIndex(i);
                                        }}
                                        key={i}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label='Member'
                                                variant='outlined'
                                            />
                                        )}
                                    />
                                </TD>
                            </TR>
                        ))
                    ) : (
                        <div></div>
                    )}
                </TableContent>
            </Table>
            <BtnWraper>
                <Link to={`/work/${id}/sprint/${sprintId}/DoneSprint`}>
                <Button
                    variant='contained'
                    color='primary'
                    size='medium'
                    onClick={handleClick}
                >
                    Save
                </Button>{' '}
                </Link>
                <Link>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='medium'
                        onClick={()=>history.goBack()}
                    >
                        Cancel
                    </Button>
                </Link>
            </BtnWraper>
        </Container>
    );
}
export default ChooseMemberCard;
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    ${
        '' /* Button{
      width:fit-content;;
  } */
    }

    ${'' /* background-color:red; */}
`;
const Table = styled.table`
    width: 100%;
    ${'' /* background-color:red; */}
`;
const TH = styled.th`
    width: 100%;
    ${'' /* background-color: #3f51b5; */}
    ${'' /* border-right: 1px solid #000000; */}
  font-size: 15px;
    ${'' /* color: white; */}
`;
const TR = styled.tr`
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #9e9e9e;
    ${'' /* background-color: #edecee; */}
`;
const TableHeader = styled.div`
    ${'' /* width: 1000px; */}
    position: sticky;
    top: 0;
    z-index: 2;
    border-bottom: 2px solid black;

    ${'' /* background-color:red; */}
`;
const TD = styled.td`
    ${'' /* background-color:black; */}
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;
const TableContent = styled.div`
    width: 100%;
    ${'' /* display:fele */}
    ${'' /* background-color:red; */}
`;
const BtnWraper = styled.div`
    ${'' /* width: 100%; */}
    ${'' /* display:fele */}
 ${'' /* background-color:red; */}
  margin-top:15px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
const ComboBoxe = styled(ComboBox)`
    width: 100px !important;
`;
