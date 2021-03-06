import React from 'react';
import SideBar from '../../components/side-bar/side-bar.component';
import BacklogTabPanel from '../../components/product-backlog/BacklogTabPanel.component';
import styled from 'styled-components';
import img from '../../assets/images/Bg1.jpg';
import ProductBacklogNoProject from '../../components/product-backlog/ProductBacklogNOProjects.component';
import ProductBacklogContainer from '../../components/product-backlog/ProductBacklogContainer.component';
import Button from '@material-ui/core/Button';
import ProductBacklogTable from '../../components/product-backlog/productbacklogtable';
function ProductBacklog(props) {
    // this page will render if there is a project registerd for the user
    return (
        <div style={{display:'flex'}}>
            <div>
                <SideBar />
            </div>
            <div>
                <Container>
                    <Content>
                        <Banner>
                            <h1>Product Backlog</h1>
                        </Banner>
                        <TabWraper>
                            <BacklogTabPanel />
                            <TabConent>
                                <ProductBacklogTable />
                            </TabConent>
                        </TabWraper>
                    </Content>
                </Container>
            </div>
        </div>
    );
}
export default ProductBacklog;
const Content = styled.div`
    //   background-color: green;
    //  width:fit-content;
    height: 800px;
    width: 1300px;
    display: flex;
    flex-direction: column;
    // justify-content: flex-end;
`;
const TabWraper = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const TabConent = styled.div`
    width: 6000px;
    height: 550px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin-left: 50px;
    Button {
        height: fit-content;
        margin-left: 20px;
    }
`;
const Container = styled.div`
    // background-color:black;
    // height:1500px;
    display: flex;
    align-items: center;
    //   margin-left:150px;
    justify-content: flex-start;
`;

const Banner = styled.div`
    // border: 1px solid #000;
    background: url(${img});
    // background-color:grey;
    // background: #2980b9; /* fallback for old browsers */
    // background: -webkit-linear-gradient(to right, #2980b9, #2c3e50); /* Chrome 10-25, Safari 5.1-6 */
    // background: linear-gradient(to right, #2980b9, #2c3e50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: 100%;
    height: 180px;
    // margin-left: -30px;
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 750px) {
        height: 150px;
    }
    h1 {
        @media only screen and (max-width: 750px) {
            margin-top: 90px;
        }
        margin-left: 25px;
        font-size: 40px;
    }
`;
