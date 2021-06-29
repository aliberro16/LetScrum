import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductBacklogCard from './ProductbacklogCard';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';

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
                                                                            // task.data().story = storyDoc.data().story;
                                                                            // Object.assign(task.data(), {story: storyDoc.data().story})
                                                                            // console.log(storyDoc.data().story);
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
    // const todoTasks = [];
    // const doingTasks = [];
    // const doneTasks = [];
    const [todoTasks, setTodoTasks] = useState([]);
    const [doingTasks, setDoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    
    const fillArrays = () => {
        taskData.map((task) => {
            task.progress === 0
                ? setTodoTasks((prevTasks) => [...prevTasks, task])
                : task.progress <= 99 && task.progress >= 1
                ? setDoingTasks((prevTasks) => [...prevTasks, task])
                : setDoneTasks((prevTasks) => [...prevTasks, task]);
        });
    };
    useEffect(() => {
        setTaskData([]);
        setDoneTasks([]);
        setDoingTasks([]);
        setTodoTasks([]);

        getMemberEmail();
        searchForTheMembersProjects();
        fillArrays()
     
        return () => {
            setTaskData([]);
            setDoneTasks([]);
            setDoingTasks([]);
            setTodoTasks([]);
        };
    }, [id, memberEmail]);

    // useEffect(()=>{
    //     const fillArrays = () => {
    //         taskData.map((task) => {
    //             task.progress === 0
    //                 ? setTodoTasks((prevTasks) => [...prevTasks, task])
    //                 : task.progress <= 99 && task.progress >= 1
    //                 ? setDoingTasks((prevTasks) => [...prevTasks, task])
    //                 : setDoneTasks((prevTasks) => [...prevTasks, task]);
    //         });
    //     };
    //     fillArrays();
    // }, [])

    return (
        <Container>
            <Table>
                <TableHeader>
                    <TR>
                        <TH>TODO</TH>
                        <TH>Doing</TH>
                        <TH>Done</TH>
                    </TR>
                </TableHeader>
                <TableContent>
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
const TableHeader = styled.div`
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
