import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { Link,Switch,Route } from "react-router-dom";
import Header from "../../components/header/header.component";
import Button from "@material-ui/core/Button";
import CreateProjectImage from "../../assets/images/create-project-image.svg";
import BackToTop from "../../components/scroll-to-top-button/ScrollButton.js";
import Footer from "../../components/footer/Footer.component";
import horizontalbg from "../../assets/images/horizontalbg.png";
import LearnImage from "../../assets/images/online-learn.jpg";
import BuildImage from "../../assets/images/build-project.jpg";
import AboutUsImage from "../../assets/images/About.jpg";
import TrackProjectsImage from "../../assets/images/trackProjects.svg";
import TwoInOne from "../../assets/images/two-in-one.svg";
import SignUp from "../../components/sign-up/signup.component"
import "./landingscreen.styles.scss";

const LandingScreen = (props) => {
  const [email, setEmail] = useState("");
  const handelEmail = (event) => {
    setEmail(event.target.value);
  };

  useEffect(()=>{
    console.log(email);
  },[email])

  return (
    <div className="pagebackground">
      <Header />
      <Container className="container">
        <div className="banner1">
          <div className="left__banner">
            <h1 className="title" id="back-to-top-anchor">
              One place<br></br>for all your work.
            </h1>
            <h5 className="subtitle">Save one day every week. Guaranteed.</h5>
            <div className="inp-btn">
              <input
                type="email"
                placeholder="Enter your email address"
                className="email-input"
                onChange={handelEmail}
              />
              <Link to={{ pathname: `/register`, email:{email} }} >
                <Button color="primary" variant="contained" className="btn">
                  Get Started
                </Button>
              </Link>
              
            </div>
          </div>
          <div className="right__banner">
            <img
              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png"
              height="650"
              width="600"
              className="img-fluid"
            ></img>
          </div>
        </div>
        <div className="info__section">
          <div className="info__content">
            <img src={LearnImage} width="350"></img>
            <h2 className="color__text"> Learn Easily</h2>
            <p> Learn Scrum Agile development via videos and courses! </p>
          </div>
          <div className="info__content">
            <img src={BuildImage} width="350"></img>
            <h2 className="color__text1"> Build Project</h2>
            <p> Build your projects keeping track of work </p>
          </div>
          <div className="info__content">
            <img src={AboutUsImage} width="350"></img>
            <h2 className="color__text2"> About Us</h2>
            <p>
              {" "}
              LetScrum team is a group of two UA Students who made their best as
              software engineers to give birth to this friendly website{" "}
            </p>
          </div>
        </div>
        <div className="signup__section">
          <div className="signup__content">
            <div className="signup__content__text">
              <h1>LetScrum, To get your projects done.</h1>
              <p>Don't loose time, Login Now!</p>
            </div>
            <div></div>
            <div className="signup__content__btn__image">
              <div className="signup__content__btn">
                <Button
                  color="primary"
                  variant="contained"
                  className="btn"
                  href="/register"
                >
                  {" "}
                  Sign Up{" "}
                </Button>
              </div>
              <img width="190px" src={horizontalbg}></img>
            </div>
          </div>
        </div>
        <div className="features__section">
          <div className="feature1__content">
            <div className="feature1__content__image">
              <img width="500px" alt="" src={CreateProjectImage} />
            </div>
            <div className="feature1__content__text">
              <h1> Educational and Beneficial</h1>
              <p>
                LetScrum shows you videos explaining scrum agile development in
                an easy interactive way. And gives you benefical courses
              </p>
            </div>
          </div>
          <div className="feature2__content">
            <div className="feature2__content__image">
              <img width="500px" alt="" src={TrackProjectsImage} />
            </div>
            <div className="feature2__content__text">
              <h1> Keep track of projects</h1>
              <p>
                Building your projects on LetScrum enables you to keep track of
                the project, showing you the tasks to do, doing and done
              </p>
            </div>
          </div>
          <div className="feature1__content">
            <div className="feature1__content__image">
              <img width="500px" alt="" src={TwoInOne} />
            </div>
            <div className="feature1__content__text">
              <h1> Two in one</h1>
              <p>
                Don't Forget that the project will be done using scrum agile
                development technique. So you will learn at first then get the
                necessary parctice
              </p>
            </div>
          </div>
        </div>
        <BackToTop />
        <Footer />
      </Container>
    </div>
  );
};

export default LandingScreen;
// <Switch>
              //   <Route
              //     path="/register"
              //     render={(props) => (
              //       <SignUp {...props} state={email} setState={setEmail} />
              //     )}
              //   />
              // </Switch>