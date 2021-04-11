import React from 'react';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import file1 from '../../assets/pdf/AgileCourse.pdf';
import file2 from '../../assets/pdf/ScrumCourse.pdf';
import { Icon } from 'react-icons-kit';
import { filePdf } from 'react-icons-kit/icomoon/filePdf';
import { Container } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import ReactPlayer from 'react-player';
import './educationpage.styles.scss';

function EducationPage(){
    return (
        <div className='pagebackground'>
            <Header />
            <Container>
                <div className='banner'>
                    <h1>Documentation</h1>
                    <h2> Enjoy Learning!</h2>
                </div>
                <div className='App'>
                    <h1 className='h1'>Documentation</h1>
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
                            <div
                                className='panel-content'
                                style={{ marginLeft: 150 }}
                            >
                                <h4>{file1.replace(/^.*[\\\/]/, '')}</h4>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    title='Click here'
                                    placement='right-end'
                                    enterDelay={50}
                                    leaveDelay={150}
                                >
                                    <a
                                        href={file1}
                                        target='_blank'
                                        style={{ color: 'red' }}
                                    >
                                        <Icon size={120} icon={filePdf} />
                                    </a>
                                </Tooltip>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div
                                className='panel-content'
                                style={{ marginLeft: 150 }}
                            >
                                <h4>{file2.replace(/^.*[\\\/]/, '')}</h4>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    title='Click here'
                                    placement='right-end'
                                    enterDelay={50}
                                    leaveDelay={200}
                                >
                                    <a
                                        href={file2}
                                        target='_blank'
                                        style={{ color: 'red' }}
                                    >
                                        <Icon size={120} icon={filePdf} />
                                    </a>
                                </Tooltip>
                            </div>
                        </TabPanel>
                    </Tabs>
                    <h1 className='h1 space-up'>Videos</h1>
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
                            <div
                                className='panel-content'
                                style={{ marginLeft: 150 }}
                            >
                                <ReactPlayer
                                    width='480px'
                                    height='300px'
                                    controls
                                    url='https://www.youtube.com/watch?v=fuOUiXEaeQg'
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='panel-content'>
                                <h2>Any content 2</h2>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='panel-content'>
                                <h2>Any content 3</h2>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='panel-content'>
                                <h2>Any content 4</h2>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='panel-content'>
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
