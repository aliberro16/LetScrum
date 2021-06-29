import React from 'react';
import { firestore } from '../../firebase/firebase.utils';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
class ChooseTaskCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            checked: [],
            chosenTasks: [],
        };
    }

    componentDidMount() {
        this.getMemberEmail();
    }

    componentDidUpdate(prevProps, prevState) {
        const { tasks } = this.state;
        if (prevState.tasks.length !== tasks.length) {
            this.setState({
                checked: new Array(tasks.length).fill(false),
            });
        }
    }

    handleChange = (i) => {
        this.setState(
            (prevState) => ({
                checked: [
                    ...prevState.checked.slice(0, i),
                    !prevState.checked[i],
                    ...prevState.checked.slice(i + 1),
                ],
            }),
            () => {
                const { checked, chosenTasks, tasks } = this.state;
                if (checked[i]) {
                    const updateTasks = [
                        ...chosenTasks.slice(0, i),
                        tasks[i],
                        ...chosenTasks.slice(i),
                    ];
                    this.setState({ chosenTasks: updateTasks });
                } else {
                    chosenTasks.splice(i, 1);
                    this.setState({ chosenTasks });
                }
            }
        );
    };

    getMemberEmail = async () => {
        const { match } = this.props;
        await firestore
            .collection('users')
            .doc(match.params.id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    this.searchForTheMembersProjects(doc.data().email);
                }
            });
    };

    searchForTheMembersProjects = async (memberEmail) => {
        const userRef = firestore.collection('users');
        userRef.get().then((snapshots) => {
            snapshots.forEach((user) => {
                const projectRef = userRef.doc(user.id).collection('projects');

                projectRef.get().then((snapShots) => {
                    snapShots.forEach((doc) => {
                        projectRef
                            .doc(doc.id)
                            .collection('members')
                            .where('isScrumMaster', '==', true)
                            .where('email', '==', memberEmail)
                            .onSnapshot((snapshots) => {
                                snapshots.forEach((docc) => {
                                    docc.ref.parent.parent.get().then((dc) => {
                                        var projectTitle = {
                                            project: dc.data().title,
                                        };
                                        if (dc.exists) {
                                            var storyRef = projectRef
                                                .doc(dc.id)
                                                .collection('userStories');
                                            storyRef.get().then((storyDocs) => {
                                                storyDocs.forEach(
                                                    (storyDoc) => {
                                                        var story = {
                                                            story: storyDoc.data()
                                                                .story,
                                                        };
                                                        storyRef
                                                            .doc(storyDoc.id)
                                                            .collection('tasks')
                                                            .get()
                                                            .then(
                                                                (snapshots) => {
                                                                    snapshots.forEach(
                                                                        (
                                                                            taskDoc
                                                                        ) => {
                                                                            var project_story =
                                                                                {
                                                                                    ...projectTitle,
                                                                                    ...story,
                                                                                };
                                                                            var newTask =
                                                                                {
                                                                                    ...taskDoc.data(),
                                                                                    ...project_story,
                                                                                };
                                                                            this.setState(
                                                                                (
                                                                                    prevState
                                                                                ) => ({
                                                                                    tasks: [
                                                                                        ...prevState.tasks,
                                                                                        newTask,
                                                                                    ],
                                                                                })
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

    render() {
        const { match } = this.props;
        const { tasks, checked, chosenTasks } = this.state;

        return (
            <Container>
                <Table>
                    <TableHeader>
                        <TR>
                            <TH>#</TH>
                            <TH>Project</TH>
                            <TH>Story</TH>
                            <TH>Task</TH>
                            <TH>Progress</TH>
                        </TR>
                    </TableHeader>
                    <TableContent>
                        {tasks.length > 0 ? (
                            tasks.map((task, i) => (
                                <TR key={i}>
                                    <TD>
                                        <Checkbox
                                            color='primary'
                                            onChange={() => {
                                                this.handleChange(i);
                                            }}
                                            key={i}
                                            checked={checked[i]}
                                        />
                                    </TD>
                                    <TD>{task.project}</TD>
                                    <TD>{task.story}</TD>
                                    <TD>{task.task}</TD>
                                    <TD>{task.progress}</TD>
                                </TR>
                            ))
                        ) : (
                            <div></div>
                        )}
                    </TableContent>
                </Table>
                <BtnWraper>
                    <Link
                        to={{
                            pathname: `/work/${match.params.id}/sprint/${match.params.sprintId}/choosemember`,
                            task:  this.state.chosenTasks ,
                        }}
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            size='medium'
                        >
                            Next
                        </Button>{' '}
                    </Link>
                </BtnWraper>
            </Container>
        );
    }
}

export default withRouter(ChooseTaskCard);
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
    text-transform: capitalize;
    font-weight: 400;
    ${'' /* padding:5px; */}
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
