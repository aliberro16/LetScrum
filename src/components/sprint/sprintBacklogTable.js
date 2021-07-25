import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SprintBacklogCard from './sprintBacklogCard';
import { Link, useParams } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import CircularProgress from '@material-ui/core/CircularProgress';

function SprintBacklogTable() {
    const { id } = useParams();
    const { sprintId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [memberEmail, setMemberEmail] = useState('');
    const [todoTasks, setTodoTasks] = useState([]);
    const [doingTasks, setDoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

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

    const getTasks = () => {
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
                            .onSnapshot((snapshots) => {
                                snapshots.forEach((docc) => {
                                    docc.ref.parent.parent.get().then((dc) => {
                                        if (dc.exists) {
                                            projectRef
                                                .doc(dc.id)
                                                .collection('sprints')
                                                .doc(sprintId)
                                                .collection('tasks')
                                                .get()
                                                .then((querySnapshot) => {
                                                    querySnapshot.forEach(
                                                        (d) => {
                                                            var newTask = {
                                                                ...d.data(),
                                                                id: d.id,
                                                            };
                                                            newTask.progress ==
                                                            0
                                                                ? setTodoTasks(
                                                                      (
                                                                          prevTasks1
                                                                      ) => [
                                                                          ...prevTasks1,
                                                                          newTask,
                                                                      ]
                                                                  )
                                                                : newTask.progress <=
                                                                      99 &&
                                                                  newTask.progress >=
                                                                      1
                                                                ? setDoingTasks(
                                                                      (
                                                                          prevTasks2
                                                                      ) => [
                                                                          ...prevTasks2,
                                                                          newTask,
                                                                      ]
                                                                  )
                                                                : setDoneTasks(
                                                                      (
                                                                          prevTasks3
                                                                      ) => [
                                                                          ...prevTasks3,
                                                                          newTask,
                                                                      ]
                                                                  );
                                                            // doc.data() is never undefined for query doc snapshots
                                                            setTasks((prev) => [
                                                                ...prev,
                                                                newTask,
                                                            ]);
                                                        }
                                                    );
                                                })
                                                .catch((error) => {
                                                    console.log(
                                                        'Error getting document:',
                                                        error
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


    useEffect(() => {
        setTasks([]);
        setDoneTasks([]);
        setDoingTasks([]);
        setTodoTasks([]);
        getMemberEmail();
        getTasks();
        return () => setTasks([]);
    }, [id, memberEmail]);

    useEffect(()=>{
        console.log('todo tasks: ',todoTasks)
        console.log('doing tasks: ',doingTasks)
        console.log('done tasks: ',doneTasks)
    },[todoTasks,doingTasks,doneTasks])
    return (
        <Container>
            <Table>
                <TableHeader>
                    <TR>
                        <TH>TODO</TH>
                        <TH>DOING</TH>
                        <TH>DONE</TH>
                    </TR>
                </TableHeader>
                {todoTasks.length || doingTasks.length || doneTasks.length ? (
                    <TableContent>
                        <TR>
                            <TD>
                                <SprintBacklogCard task={todoTasks} />
                            </TD>
                            <TD>
                                <SprintBacklogCard task={doingTasks} />
                            </TD>
                            <TD>
                                <SprintBacklogCard task={doneTasks} />
                            </TD>
                        </TR>
                    </TableContent>
                ) : (
                    <CircularProgress
                        size={24}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -40,
                            marginLeft: 0,
                            color: 'green',
                        }}
                    />
                )}
            </Table>
        </Container>
    );
}

export default SprintBacklogTable;
const Container = styled.div`
    width: 100%;

    ${'' /* background-color:red; */}
`;
const Table = styled.table`
    width: 100%;
    ${'' /* background-color:red; */}
`;
const TH = styled.th`
    width: 100%;
    background-color: #3f51b5;
    border-right: 1px solid #000000;
    font-size: 30px;
    color: white;
`;
const TR = styled.tr`
    display: flex;
    justify-content: space-around;
    background-color: #edecee;
`;
const TableHeader = styled.thead`
    width: 1000px;
    position: sticky;
    top: 0;
    z-index: 2;

    ${'' /* background-color:red; */}
`;
const TD = styled.td`
    //    background-color:black;
    width: 100%;
`;
const TableContent = styled.tbody`
    width: 1000px;
    ${'' /* display:fele */}
    ${'' /* background-color:red; */}
`;
