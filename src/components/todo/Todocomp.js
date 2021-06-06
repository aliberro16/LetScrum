import React, { Component, Fragment } from 'react';
import AddTodoForm from './AddTodoForm';
import List from './List';
import { Paper, Grid, Typography } from '@material-ui/core';
import { firestore } from '../../firebase/firebase.utils';

const styles = {
    Paper: {
        padding: 20,
        margin: 'auto',
        textAlign: 'center',
        width: 500,
    },
};

class Todocomp extends Component {
    state = {
        list: {},
        id: '',
    };
    componentDidMount() {
        const id = window.location.pathname.split('/')[2];
        console.log('id => ', id);
        this.setState({ id: id });
        // this.addToList(this.getTodosFromFirestore(id));
        firestore
            .collection('users')
            .doc(id)
            .collection('todos')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, ' => ', doc.data().todo);
                    // this.setState({list : doc.data().todo});
                    let list = { ...this.state.list };
                    list[`todo${Date.now()}`] = {
                        todo: doc.data().todo,
                        status: 'active',
                    };
                    this.setState({ list: list });
                });
            });
    }

    addTodoToFirestore = async (todo) => {
        await firestore
            .collection('users')
            .doc(this.state.id)
            .collection('todos')
            .add({ todo });
    };

    getTodosFromFirestore = async (id) => {
        await firestore
            .collection('users')
            .doc(id)
            .collection('todo')
            .get()
            .then((doc) => {
                if (doc.exists) {
                    //save user info
                    return doc.todo;
                } else {
                    //redirect to HomePage
                }
            });
    };

    addToList = (todo) => {
        let list = { ...this.state.list };
        list[`todo${Date.now()}`] = {
            todo: todo,
            status: 'active',
        };
        this.addTodoToFirestore(todo);
        this.setState({ list });
    };

    deleteTodo = (key) => {
        let list = { ...this.state.list };
        firestore
            .collection('users')
            .doc(this.state.id)
            .collection('todos')
            .where('todo', '==', list[key]['todo'].toString())
            .get()
            .then((querySnapShot) => {
                querySnapShot.forEach((doc) => doc.ref.delete());
            });
        list[key] = null;


        this.setState({ list });
    };
    updateTodo = (key) => {
        let list = { ...this.state.list };
        list[key]['status'] = 'editing';

        this.setState({ list });
    };
    saveTodo = (key, todo) => {
        let list = { ...this.state.list };
        list[key] = {
            todo: todo,
            status: 'active',
        };
        this.setState({ list });
    };
    render() {
        return (
            <Fragment>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Paper style={styles.Paper}>
                            <AddTodoForm addToList={this.addToList} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} style={styles.Paper}>
                        <List
                            deleteTodo={this.deleteTodo}
                            list={this.state.list}
                            updateTodo={this.updateTodo}
                            saveTodo={this.saveTodo}
                        />
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

export default Todocomp;
