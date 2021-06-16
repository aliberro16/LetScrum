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
import './App.css';
import AddTask from './components/task/AddTask.component';
import AddUserStory from './components/user-story/AddUserStory.Component';
import NoTask from './components/task/NoTask';
import ProductBacklogNoProject from './components/product-backlog/ProductBacklogNOProjects.component';
import NoStory from './components/user-story/NoStory';
import AddTaskCard from "./components/task/AddTaskCard"
import UserStoryView from "./components/user-story/UserStoryView"
import StoryDetail from './components/user-story/StoryDetail';
import TaskDetail from './components/task/TaskDetail';


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
                        <Route exact path='/work/:id/productbacklog' component={ProductBacklogNoProject}/>
                        <Route exact path='/work/:id/project/pending-request' component={PendingProject}/>  
                        <Route exact path='/work/:id/project/join-project' component={JoinProjectPage} />
                        <Route exact path='/work/:id/project/choose-project/:pid' component={ChooseProjectPage} />
                        <Route exact path='/work/:id/project/choose-project/' component={ChooseProjectPage} />
                        <Route exact path='/work/:id/productbacklog/Task' component={NoTask} />
                        <Route exact path='/work/:id/productbacklog/userstory' component={NoStory} />
                        <Route exact path='/work/:id/productbacklog/ProductBacklog' component={ProductBacklog}/>
                        <Route exact path='/work/:id/productbacklog/addTask' component={AddTask} />
                        <Route exact path='/work/:id/productbacklog/addUserStory' component={AddUserStory} />
                        <Route exact path='/work/:id/productbacklog/userStoryView' component={UserStoryView} />
                        <Route exact path='/work/:id/productbacklog/StoryDetail' component={StoryDetail} />
                        <Route exact path='/work/:id/productbacklog/taskDetail' component={TaskDetail} />
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
