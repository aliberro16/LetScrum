import './App.css';
import ProjectPage from './pages/project-page/project-page.component';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignInPage from './pages/signin-page/signin-page.component';
import SignUpPage from './pages/signup-page/signup-page.component';
import LandingScreen from './pages/landing-screen/landingscreen.component';
import EducationPage from './pages/education-page/educationpage.component';
import ScrollToTop from '../src/StartFromTop';
class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <Switch>
                    <ScrollToTop>
                        <Route exact path='/' component={LandingScreen} />
                        <Route exact path='/project' component={ProjectPage} />
                        <Route exact path='/signin' component={SignInPage} />
                        <Route exact path='/register' component={SignUpPage} />
                        <Route exact path='/learn' component={EducationPage} />
                    </ScrollToTop>
                </Switch>
            </div>
        );
    }
}
export default App;
