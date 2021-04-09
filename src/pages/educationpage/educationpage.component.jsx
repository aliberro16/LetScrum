import React from "react";
import Header from "../../components/header/header.component";
import { Container } from "@material-ui/core";
import "./educationpage.styles.scss";
import Footer from "../../components/footer/Footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function EducationPage() {
  return (
    <div className="pagebackground">
      <Header />
      <Container>
        <div className="banner">
          <h1>Documentation</h1>
          <h2> Enjoy Learning!</h2>
        </div>
        <div className="App">
          <h1 className = 'h1'>Documentation</h1>
          <Tabs>
            <TabList>
              <Tab>
                <p>Agile</p>
              </Tab>
              <Tab>
                <p>Scrum</p>
              </Tab>
            </TabList>

            <TabPanel>
              <div className="panel-content">
                <h2>Any content 1</h2>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Any content 2</h2>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Any content 3</h2>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Any content 4</h2>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Any content 5</h2>
              </div>
            </TabPanel>
          </Tabs>
          <h1 className = 'h1 space-up'>Videos</h1>
          <Tabs>
            <TabList>
              <Tab>
                <p>video1</p>
              </Tab>
              <Tab>
                <p>video2</p>
              </Tab>
              <Tab>
                <p>video3</p>
              </Tab>
              <Tab>
                <p>video4</p>
              </Tab>
            </TabList>

            <TabPanel>
              <div className="panel-content">
                <h2>Any content 1</h2>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Any content 2</h2>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Any content 3</h2>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Any content 4</h2>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="panel-content">
                <h2>Any content 5</h2>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default EducationPage;
