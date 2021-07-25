import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link, useLocation, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormInput from '../form-input/form-input.component';
import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase.utils';

function EditTaskCard() {
    let location = useLocation();
    const [progress, setProgress] = useState(location.taskk.progress);
    const handleChange = (e) => {
        const value = e.target.value;
        setProgress(value);
    };
    const { id } = useParams();
    const { sprintId } = useParams();
    const { taskId } = useParams();
    const [memberEmail, setMemberEmail] = useState('');

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateTaskProgress = () => {
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
                                                .doc(taskId)
                                                .update({ progress: progress });
                                                alert('update done!')
                                        }
                                    });
                                });
                            });
                    });
                });
            });
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

    useEffect(() => {
        getMemberEmail();
    }, [id, memberEmail]);

    const timer = React.useRef();
    // useEffect(() => {
    //     return () => {
    //         clearTimeout(timer.current);
    //     };
    // }, []);

    const handleClick = (e) => {
        e.preventDefault();
        updateTaskProgress();
        setTimeout(() => {
            window.location.href=`/work/${id}/sprint/${sprintId}/sprintbacklog`
        }, 5000);
    };

    return (
        <Container>
            <Table>
                <TableHeader>
                    <TR>
                        <TH>Task</TH>
                        <TH>Progress</TH>
                        <TH>User</TH>
                    </TR>
                </TableHeader>
                <TableContent>
                    <TR>
                        <TD>{capitalizeFirstLetter(location.taskk.task)}</TD>
                        <TD>
                            <FormInputWraper>
                                <FormInput
                                    type='number'
                                    name='progress'
                                    value={progress}
                                    onChange={handleChange}
                                    label='Progress'
                                    required
                                    InputProps={{
                                        inputProps: {
                                            max: 100,
                                            min: 0,
                                        },
                                    }}
                                />
                            </FormInputWraper>
                        </TD>
                        <TD>
                            {/* <Autocomplete
                                id='combo-box-Member'
                                style={{ width: 200 }}
                                options={Members}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => ( */}
                            <TextField
                                label='Member'
                                variant='outlined'
                                defaultValue={location.taskk.member}
                                disabled
                            />
                            {/* //     )}
                                
                            // />  */}
                        </TD>
                    </TR>
                </TableContent>
            </Table>
            <BtnWraper>
                {/* <Link to={`/work/${id}/sprint/${sprintId}/sprintbacklog`}> */}
                    <Button
                        variant='contained'
                        color='primary'
                        size='medium'
                        onClick={handleClick}
                    >
                        Done
                    </Button>{' '}
                {/* </Link> */}
                <Link to={`/work/${id}/sprint/${sprintId}/sprintbacklog`}>
                    <Button variant='contained' color='secondary' size='medium'>
                        Cancel
                    </Button>{' '}
                </Link>
            </BtnWraper>
        </Container>
    );
}
export default EditTaskCard;
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
    btn {
        margin-left: 10px;
    }
`;
const FormInputWraper = styled.div`
    margin-top: -25px;
    width: 100px;
`;
