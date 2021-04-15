import React                                    from 'react';
import ProjectPage                              from './pages/project-page/project-page.component';
import { Switch, Route, Redirect }              from 'react-router-dom';
import { connect }                              from 'react-redux';
import { setCurrentUser }                       from './redux/user/user.actions';
import SignInPage                               from './pages/signin-page/signin-page.component';
import SignUpPage                               from './pages/signup-page/signup-page.component';
import LandingScreen                            from './pages/landing-screen/landingscreen.component';
import EducationPage                            from './pages/education-page/educationpage.component';
import ScrollToTop                              from '../src/StartFromTop';
import { auth, createUserProfileDocument }      from './firebase/firebase.utils';
import './App.css';

class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount(){
        const { setCurrentUser } = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot((snapShot) => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data(),
                    });
                });
            }
            setCurrentUser(userAuth);
        });
        // console.log(this.props.currentUser);
    }
    //to handle our app being aware from any auth changes on firebase:
    componentWillUnmount(){
        this.unsubscribeFromAuth(); 
    }

    render() {
        return (
            <div className='App'>
                <Switch>
                    <ScrollToTop>
                        <Route exact path='/' component={LandingScreen} />
                        <Route exact path='/project' component={ProjectPage} />
                        <Route exact path='/learn' component={EducationPage} />
                        <Route exact path='/signin' render={() =>
                            this.props.currentUser ? (
                                <Redirect to='/' />
                            ) : (
                                <SignInPage />
                            )
                        } />
                        <Route exact path='/register' component={SignUpPage} />
                    </ScrollToTop>
                </Switch>
            </div>
        );
    }
}


const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

