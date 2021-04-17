import React from 'react';
import FormInput from '../form-input/form-input.component';
// import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './signup.styles.scss';
import Button from '@material-ui/core/Button';
import SignUpImage from '../../assets/images/SignUp.svg';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: null,
            errorMessage: '',
            isSuccessfull: null,
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {
            displayName,
            phoneNumber,
            email,
            password,
            confirmPassword,
        } = this.state;

        if (password !== confirmPassword) {
            alert("Password doesn't match!");
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            createUserProfileDocument(user, { displayName, phoneNumber });
            // to clear out our form we can do this:
            this.setState({
                displayName: '',
                phoneNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: null,
                isSuccessfull: true,
            });
        } catch (error) {
            console.error(error);
            this.setState({ error, errorMessage: error.message });
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const {
            displayName,
            phoneNumber,
            email,
            password,
            confirmPassword,
        } = this.state;

        return (
            <div>
                {this.state.error ? (
                    <div style={{ display: 'block', width: '100%' }}>
                        <Alert variant='filled' severity='error'>
                            {this.state.errorMessage}
                        </Alert>
                    </div>
                ) : this.state.isSuccessfull ? (
                    <div style={{ display: 'block', width: '100%' }}>
                        <Alert variant='filled' severity='success'>
                            Account added successfully!
                        </Alert>
                    </div>
                ) : null}
                <div className='signup-page'>
                    {/* {this.state.error ? (
                        <div style={{ display: 'block', width: '100%' }}>
                            <Alert variant='filled' severity='error'>
                                {this.state.errorMessage}
                            </Alert>
                        </div>
                    ) : null} */}
                    <div className='image'>
                        <img src={SignUpImage} />
                    </div>
                    <div className='form-container'>
                        <Paper
                            variant='outlined'
                            square
                            className='sign-up-container'
                        >
                            <div className='sign-up'>
                                <h2 className='title'>Sign up for LetScrum</h2>
                                <span className='subtitle'>Sign up Now </span>
                                <form
                                    onSubmit={this.handleSubmit}
                                    className='sign-up-form'
                                >
                                    <FormInput
                                        type='text'
                                        name='displayName'
                                        value={displayName}
                                        onChange={this.handleChange}
                                        label='Display Name'
                                        required
                                    />
                                    <FormInput
                                        type='tel'
                                        name='phoneNumber'
                                        value={phoneNumber}
                                        onChange={this.handleChange}
                                        label='Phone Number'
                                        required
                                    />
                                    <FormInput
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={this.handleChange}
                                        label='Email'
                                        required
                                    />
                                    <FormInput
                                        type='password'
                                        name='password'
                                        value={password}
                                        onChange={this.handleChange}
                                        label='Password'
                                        required
                                    />
                                    <FormInput
                                        type='password'
                                        name='confirmPassword'
                                        value={confirmPassword}
                                        onChange={this.handleChange}
                                        label='Confirm password'
                                        required
                                    />
                                    <div className='buttons'>
                                        <Button
                                            type='submit'
                                            color='primary'
                                            variant='contained'
                                            size='large'
                                        >
                                            SIGN UP
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}
export default SignUp;
