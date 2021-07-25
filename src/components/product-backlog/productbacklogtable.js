import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductBacklogCard from './ProductbacklogCard';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import CircularProgress from '@material-ui/core/CircularProgress';

function ProductBacklogTable() {
    const { id } = useParams();
    const [memberEmail, setMemberEmail] = useState('');
    const [taskData, setTaskData] = useState([]);

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
                            .get()
                            .then((snapshots) => {
                                snapshots.forEach((docc) => {
                                    docc.ref.parent.parent.get().then((dc) => {
                                        if (dc.exists) {
                                            // console.log(dc.data());
                                            var storyRef = projectRef
                                                .doc(dc.id)
                                                .collection('userStories');
                                            storyRef.get().then((storyDocs) => {
                                                storyDocs.forEach(
                                                    (storyDoc) => {
                                                        storyRef
                                                            .doc(storyDoc.id)
                                                            .collection('tasks')
                                                            .get()
                                                            .then(
                                                                (snapShots) => {
                                                                    snapShots.forEach(
                                                                        (
                                                                            task
                                                                        ) => {
                                                                            console.log(
                                                                                task.data()
                                                                            );
                                                                            var story =
                                                                                {
                                                                                    story: storyDoc.data()
                                                                                        .story,
                                                                                };
                                                                            var newTask =
                                                                                {
                                                                                    ...task.data(),
                                                                                    ...story,
                                                                                };
                                                                            newTask.progress ===
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
                                                                            setTaskData(
                                                                                (
                                                                                    prevData
                                                                                ) => [
                                                                                    ...prevData,
                                                                                    newTask,
                                                                                ]
                                                                            );
                                                                        }
                                                                    );
                                                                }
                                                            );
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

    const [todoTasks, setTodoTasks] = useState([]);
    const [doingTasks, setDoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        setTaskData([]);
        setDoneTasks([]);
        setDoingTasks([]);
        setTodoTasks([]);

        getMemberEmail();
        searchForTheMembersProjects();
        
    }, [id, memberEmail]);

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
                <TableContent>
                    {todoTasks.length ||
                    doingTasks.length ||
                    doneTasks.length ? (
                        <TR>
                            <TD>
                                <ProductBacklogCard tasks={todoTasks} />
                            </TD>
                            <TD>
                                {' '}
                                <ProductBacklogCard tasks={doingTasks} />
                            </TD>
                            <TD>
                                {' '}
                                <ProductBacklogCard tasks={doneTasks} />
                            </TD>
                        </TR>
                    ) : (
                        <TR>
                            <TD>

                            </TD>
                            <TD>
                                <CircularProgress
                                    color='secondary'
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop:'100px'
                                    }}
                                />
                            </TD>
                        </TR>
                    )}
                </TableContent>
            </Table>
        </Container>
    );
}

export default ProductBacklogTable;
const Container = styled.div`
    width: 100%;
`;
const Table = styled.table`
    width: 100%;
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
const TableHeader = styled.tbody`
    width: 1000px;
    position: sticky;
    top: 0;
    z-index: 2;
`;
const TD = styled.td`
    width: 100%;
`;
const TableContent = styled.tbody`
    width: 1000px;
`;
