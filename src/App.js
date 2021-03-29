import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import './App.css';
import Footer from './components/footer/Footer.js'

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <div className='cover'>
                    <Header/>
                    <HomePage />
                    <Footer/>
                </div>
            </div>
        );
    }
}
export default App;
