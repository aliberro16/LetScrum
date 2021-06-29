import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Link, useParams, useLocation } from 'react-router-dom';
import ComboBox from '../combo-box/ComboBox.component';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function ChooseMemberCard() {
    const { id } = useParams();
    let location = useLocation();
    const [tasks, setTasks] = useState([]);
    const [memberEmail, setMemberEmail] = useState('');
    const [memData, setMemData] = useState([]);
    // const [selectedValue, setSelectedValue] = useState(new Array(tasks.length).fill({}));
    const [inputValue, setInputValue] = useState('');
    const [ind, setIndex] = useState();

    // const onInputChange = (newInputValue) => {
    //     // setInputValue(new Array(tasks.length).fill(''))
    //     if (tasks.length !== 0) {
    //         var updatedTasksArray = [...tasks];
    //         updatedTasksArray.map((task) => (task.member = newInputValue));
    //         console.log(updatedTasksArray);
    //     }
    //     // updatedTasksArray[i].member = newInputValue;
    //     // var updatedArr = [...inputValue];
    //     // updatedArr[i] = newInputValue;
    //     // setInputValue(updatedArr);
    // };

    useEffect(() => {
        if (tasks.length !== 0) {
            // var updatedTasksArray = [...tasks];
            // // for(let i=0; i<updatedTasksArray.lenght ; i++){
            // //         updatedTasksArray[ind].member = inputValue;
                
            // // }
            // // console.log(updatedTasksArray);
            var member = { member : inputValue};
            var newTask={...tasks[ind], ...member}
            console.log(newTask);
        }
        console.log(ind);
    }, [ind, inputValue]);

    useEffect(() => {
        console.log(inputValue);
    }, [inputValue]);

    // const handleChange = (e,i, newValue) =>{
    //     const update = [...selectedValue];
    //     update[i] = newValue;
    //     setSelectedValue(update)
    // }
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

    const assignTaskToMember = (name) => {
        firestore.collection('users').where('displayName', '==', name);
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
                <Link to={`/work/${id}/sprint/choosemember`}>
                    <Button variant='contained' color='primary' size='medium'>
                        Next
                    </Button>{' '}
                </Link>
                <Button
                    variant='contained'
                    color='secondary'
                    size='medium'
                    onChange
                >
                    Cancel
                </Button>{' '}
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
