import React from 'react'
import styled from "styled-components";

function ProductBacklogCard() {
    return (
        <Container>
            <Content>
            <Info>
                <h3>Task title</h3>
                <h3>User Story title</h3>
            </Info>
            </Content>
        </Container>
    )
}

export default ProductBacklogCard
const Container = styled.div`
margin-top:15px;
`;
const Content = styled.div`
background-color:#ff5722;
padding:30px  0px;
border-radius: 10px;

`;
const Info = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
color:white;
`;
