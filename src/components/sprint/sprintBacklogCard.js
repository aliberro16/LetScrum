import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

function SprintBacklogCard(props) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const { id } = useParams();
    const { sprintId } = useParams();
    return (
        <Container>
            {props.task.length > 0 ? (
                props.task.map((t, index) => (
                    <Content>
                        <Link
                            to={{
                                pathname: `/work/${id}/sprint/${sprintId}/taskDetail/${t.id}`,
                                task: { t },
                            }}
                            key={index}
                        >
                            <Info>
                                <h3>{capitalizeFirstLetter(t.task)}</h3>
                            </Info>
                        </Link>
                    </Content>
                ))
            ) : (
                <div> </div>
            )}
        </Container>
    );
}

export default SprintBacklogCard;
const Container = styled.div`
    margin: 15px 50px;
`;
const Content = styled.div`
    background-color: #ff5722;
    padding: 30px 0px;
    margin-top:10px;
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
