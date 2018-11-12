import styled from 'styled-components';

export const BoardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: antiquewhite;
    height: 80vmin;
    width: 80vmin;
    margin: auto auto;
`;

export const Cell = styled.div`
    display: flex;
    box-sizing: border-box;
    width: 12.5%;
    height: 12.5%;
    background-image: url(${p => p.figure});
    border: ${p => p.isSelected && '1px solid black'};
    border: ${p => p.isAvailable && '1px solid green'};
    background-size: cover;
    // TODO: Need to refactor(dummy fast solution)
    &:nth-child(16n + 2), &:nth-child(16n + 4), &:nth-child(16n + 6), &:nth-child(16n + 9),  &:nth-child(16n + 11),
    &:nth-child(16n + 13), &:nth-child(16n + 15), &:nth-child(16n + 8) {
        background-color: bisque;  
    }
`;
