import styled from 'styled-components';

export const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--primary);
    padding: 10px;
    border-radius: 8px;

`;

export const Input = styled.input`
    padding: 10px 15px;
    font-size: 1.2rem;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 0;
`;

export const Label = styled.label`
    font-size: 1.2rem;
    color: white;
    margin-bottom: 2px;
`;

export const Title = styled.h1`
    font-size: 3rem;
    text-align: center;
    color: white;
`;

export const SubmitButton = styled.button`
    padding: 10px;
    cursor: pointer;
    margin-top: 5px;
    width: 100px;
`;