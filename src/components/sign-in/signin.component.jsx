import React from 'react';
import './signin.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SignInImage from '../../assets/images/signin.svg';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    // handleSubmit = async(event) => {
    //     event.preventDefault();
    //     const {email, password} = this.state;
    //     try{
    //         await auth.signInWithEmailAndPassword(email, password);
    //         this.setState({ email: '', password: '' });
    //     }
    //     catch(error){
    //         console.error(error);
    //     }
    // };

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className='form-container'>
                {/* <div className='image'>
                    <img src={SignInImage} />
                </div> */}
                <Paper variant='outlined' square className='sign-in-container'>
                    <div className='sign-in'>
                        <h2 className='title'>Welcome Back</h2>
                        <span className='subtitle'>
                            Don't miss your next opportunity. Sign in to stay
                            updated to your professional world.
                        </span>
                        <form action='' onSubmit={this.handleSubmit}>
                            <FormInput
                                type='email'
                                name='email'
                                value={this.state.email}
                                handleChange={this.handleChange}
                                label='Email'
                                required
                            />
                            <FormInput
                                type='password'
                                name='password'
                                value={this.state.password}
                                handleChange={this.handleChange}
                                label='Password'
                                required
                            />
                            <div className='buttons'>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    size='large'
                                >
                                    Sign in
                                </Button>
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    size='large'
                                >
                                    {' '}
                                    Sign in with Google{' '}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Paper>
            </div>
        );
    }
}
export default SignIn;
