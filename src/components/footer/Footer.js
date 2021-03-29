import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "./Footer.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <AppBar className="footer_bg" position="static">
      <div className="footer">
        <Container className="content" maxWidth="lg">
          <Link to="/" className="logo-container">
            <img src={Logo} alt="LetScrum" className="logo" />
          </Link>
          <div className="right-content">
            <Toolbar>
            <div className = 'icons-container'>
              <div className = 'social-media'>
              <Link>
              <InstagramIcon></InstagramIcon>
              </Link>
              <Link>
              <TwitterIcon></TwitterIcon>
              </Link>
              <Link>
              <LinkedInIcon></LinkedInIcon>
              </Link>
              <Link>
              <FacebookIcon></FacebookIcon>
              </Link>
              </div>
              <div>
                <Typography variant="body1" color="inherit">
                  © Copyright 2021. All rights reserved.
                </Typography>
                <p className="footer_p">LetScrum was created using Scrum.</p>
              </div>
            </div>
            </Toolbar>
          </div>
        </Container>
      </div>
    </AppBar>
  );
}
