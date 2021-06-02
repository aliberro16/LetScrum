import React from 'react'
import ImgSlider from '../../components/image-slider/image-slider.component';
import SideBar from '../../components/side-bar/side-bar.component'
import styled from "styled-components";

const SideBarPage = () =>{
    return(
        <div>
        <SideBar/>
        <Container>
        </Container>
        </div>
        

    )
}
export default SideBarPage;
const Container = styled.div`
  margin: 0px;
`;