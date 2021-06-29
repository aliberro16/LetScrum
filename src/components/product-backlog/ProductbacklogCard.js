import React from 'react';
import styled from 'styled-components';


function ProductBacklogCard(props) {

    return (
        <Container>
            {props.tasks.length > 0 ? (
                props.tasks.map((task, index) => (
                    <Content key={index}>
                        <Info>
                            <h3 style={{ textTransform: 'capitalize' }}>
                                {task.task}
                            </h3>
                            <h3 style={{ textTransform: 'capitalize' }}>
                                {task.story}
                            </h3>
                        </Info>
                    </Content>
                ))
            ) : (
                <div></div>
            )}
        </Container>
    );
}

export default ProductBacklogCard;
const Container = styled.div`
    margin-top: 15px;
    margin-right: 50px;
    margin-left: 50px;
`;
const Content = styled.div`
    background-color: #ff5722;
    padding: 30px 0px;
    margin: 15px 0;
    border-radius: 10px;
    :hover {
        cursor: pointer;
        background: rgba(255, 87, 34, 0.8);
    }
`;
const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`;
