import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import ProjectPage from './pages/project-page/project-page.component';
import SignInPage from './pages/signin-page/signin-page.component';
import SignUpPage from './pages/signup-page/signup-page.component';
import LandingScreen from './pages/landing-screen/landingscreen.component';
import EducationPage from './pages/education-page/educationpage.component';
import ScrollToTop from '../src/StartFromTop';
import WaitingRoom from './pages/waiting-room/waitingroom.component';
import CreateProject from './pages/create-project-page/create-project.component';
import HomePage from './pages/home-page/homepage';
import Profile from './pages/profile-page/profile';
import ProductBacklog from './pages/product-backlog/productbacklog';
import PendingProject from './pages/pending-project/PendingProject';
import JoinProjectPage from './pages/join-project-page/join-project.component';
import ChooseProjectPage from './pages/choose-project-page/choose-project-page.component';
import BacklogTabPanel from './pages/tab.component'
import './App.css';

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
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
    }
    //to handle our app being aware from any auth changes on firebase:
    componentWillUnmount() {
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
                        <Route exact path='/work/:id/project/create-project' component={CreateProject} />
                        <Route exact path='/work/:id/project/waiting-room' component={WaitingRoom}/> 
                        <Route exact path='/work/:id/home' component={HomePage}/> 
                        <Route exact path='/work/:id/profile' component={Profile}/>
                        <Route exact path='/work/:id/productbacklog' component={ProductBacklog}/>  
                        <Route exact path='/work/:id/project/pending-request' component={PendingProject}/>  
                        <Route exact path='/work/:id/project/join-project' component={JoinProjectPage} />
                        <Route exact path='/work/:id/project/choose-project' component={ChooseProjectPage} />
                        <Route exact path='/work/:id/project/tab' component={BacklogTabPanel} />
                        <Route
                            exact
                            path='/signin'
                            render={() =>
                                this.props.currentUser ? (
                                        <Redirect
                                            to={`work/${this.props.currentUser.uid}/home`}
                                        />
                                    )
                                 : (
                                    <SignInPage />
                                )
                            }
                        />
                        <Route
                            exact
                            path='/register'
                            render={() =>
                                this.props.currentUser ? (
                                    <Redirect
                                        to={`work/${this.props.currentUser.uid}`}
                                    />
                                ) : (
                                    <SignUpPage />
                                )
                            }
                        />
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
