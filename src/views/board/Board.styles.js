import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const BoardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 80vmin;
    width: 80vmin;
    margin: auto auto;
    border: 1px solid ${p => p.theme.darkColor};
`;

export const Cell = styled.div`
    display: flex;
    box-sizing: border-box;
    width: 12.5%;
    height: 12.5%;
    background-image: url(${p => p.figure});
    background-size: cover;
    background-color: ${p => (p.isDarkCell ? lighten(p.isSelected || p.isAvailable ? 0.1 : 0, p.theme.darkColor)
        : darken(p.isSelected || p.isAvailable ? 0.2 : 0, p.theme.lightColor))};  
`;

export const WinLabel = styled.div`
    position: absolute;
    top: 40%;
    left: 30%;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #FFF;
    width: 40%;
    height: 20%;
    flex-direction: column;
`;

export const Title = styled.div`
    font-weight: bold;
    font-size: 24px;
    display: flex;
    align-self: center;
`;

export const ResetButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 120px;
    height: 40px;
    background-color: deepskyblue;
    margin-top: 20px;
    border-radius: 4px;
    font-size: 20px;
    ${p => p.disabled && 'pointer-events: none; opacity: 0.4;'}
    &:hover {
        background-color: #1aaeed;
    }
`;
