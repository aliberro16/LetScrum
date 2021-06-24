import React from 'react'
import styled from "styled-components";

function SprintBacklogCard() {
    return (
        <Container>
            <Content>
            <Info>
                <h3>Task title</h3>
            </Info>
            </Content>
        </Container>
    )
}

export default SprintBacklogCard
const Container = styled.div`
margin-top:15px;
margin-right:50px;
margin-left:50px;
`;
const Content = styled.div`
background-color:#ff5722;
padding:30px  0px;
border-radius: 10px;
:hover{
    cursor:pointer;
    background: rgba(255, 87, 34, .8);

}
`;
const Info = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
color:white;
`;
