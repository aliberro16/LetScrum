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

function EducationPage() {
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
                            <div className='panel-content'>
                                <h4>{file1.replace(/^.*[\\\/]/, '')}</h4>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    title='Click here'
                                    placement='right-end'
                                    enterDelay={50}
                                    leaveDelay={150}
                                >
                                    <a href={file1} target='_blank'>
                                        <Icon size={120} icon={filePdf} />
                                    </a>
                                </Tooltip>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='panel-content'>
                                <h4>{file2.replace(/^.*[\\\/]/, '')}</h4>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    title='Click here'
                                    placement='right-end'
                                    enterDelay={50}
                                    leaveDelay={200}
                                >
                                    <a href={file2} target='_blank'>
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
                            <div className='panel-content'>
                                <h2 className='video-title'>What is Scrum?</h2>
                                <ReactPlayer
                                    width='600px'
                                    height='400px'
                                    controls
                                    url='https://www.youtube.com/watch?v=2Vt7Ik8Ublw'
                                    className='video-player'
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='panel-content'>
                                <h2 className='video-title'>Scrum roles</h2>
                                <ReactPlayer
                                    width='600px'
                                    height='400px'
                                    controls
                                    url='https://www.youtube.com/watch?v=j7T1m2Amc40'
                                    className='video-player'
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='panel-content'>
                            <h2 className='video-title'>Scrum retrospective</h2>
                                <ReactPlayer
                                    width='600px'
                                    height='400px'
                                    controls
                                    url='https://www.youtube.com/watch?v=bHfbeucM7Tg'
                                    className='video-player'
                                />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='panel-content'>
                            <h2 className='video-title'>Burn-Down chart</h2>
                                <ReactPlayer
                                    width='600px'
                                    height='400px'
                                    controls
                                    url='https://www.youtube.com/watch?v=GokN-50Jt4A'
                                    className='video-player'
                                />
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
