import './App.css';
import ProjectPage from './pages/project-page/project-page.component';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingScreen from './pages/landingscreen/landingscreen.component.jsx';
import SignInPage from './pages/signin-page/signin-page.component';
import SignUpPage from './pages/signup-page/signup-page.component';
class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <Switch>
                    <Route exact path='/' component={LandingScreen} />
                    <Route exact path='/project' component={ProjectPage} />
                    <Route exact path='/signin' component={SignInPage} />
                    <Route exact path='/register' component={SignUpPage} />
                </Switch>
            </div>
        );
    }
}
export default App;
