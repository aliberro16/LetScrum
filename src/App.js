import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import ProjectPage from './pages/project-page/project-page.component';
import SignInPage from './pages/signin-page/signin-page.component';
import SignUpPage from './pages/signup-page/signup-page.component';
import LandingScreen from './pages/landing-screen/landingscreen.component';
import EducationPage from './pages/education-page/educationpage.component';
import SideBarPage from './pages/sideBar-page/sideBar-page.component';
import ScrollToTop from '../src/StartFromTop';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';
// import Profile from './pages/profile-page/profile';
import waitingroom from './pages/waiting-room/waitingroom';
import CreateProject from './pages/create-project-page/create-project.component';
import HomePage from './pages/home-page/homepage';
import Profile from './pages/profile-page/profile';
import ProductBacklog from './pages/product-backlog/productbacklog';

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
                        <Route exact path='/work/:id/project/waiting-room' component={waitingroom}/> 
                        <Route exact path='/work/:id/home' component={HomePage}/> 
                        <Route exact path='/work/:id/profile' component={Profile}/>
                        <Route exact path='/work/:id/productbacklog' component={ProductBacklog}/>  
                        
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
                                        to={`work/${this.props.currentUser.id}`}
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
