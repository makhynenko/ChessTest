import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: auto;
    flex-direction: column;
`;

export const Header = styled.div`
    display: flex;
    height: 90px;
    background-color: gainsboro;
    align-items: center;
    justify-content: flex-end;
`;


export const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    background-color: deepskyblue;
    margin-right: 20px;
    border-radius: 4px;
    font-size: 20px;
    ${p => p.disabled && 'pointer-events: none; opacity: 0.4;'}
    &:hover {
        background-color: #1aaeed;
    }
`;

export const Settings = styled.div`
    position: absolute;
    top: 90px;
    right: 0;
    width: 250px;
    height: 100%;
    box-shadow: -1px 2px 4px 1px rgba(0,0,0,0.5);
    background-color: #FFF;
`;

export const SettingsTitle = styled.div`
    font-size: 25px;
    padding-left: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid rgba(0,0,0,0.5);
`;

export const ColorBlock = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    margin-top: 20px;
`;

export const ColorTitle = styled.div`
    display: flex;
`;

export const ColorInput = styled.input`
    display: flex;
`;

export const ButtonBlock = styled.div`
    margin: 15px;
    display: flex;
    font-size: 16px;
`;

export const ColorSave = styled(Button)`
    height: 28px;
    width: 76px;
    font-size: 16px;
`;

export const ColorCancel = styled(ColorSave)`
    background-color: lightgray;
    &:hover {
        background-color: #C0C0C0;
    }
`;
