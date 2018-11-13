import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import Board from '../board/Board';
import * as styled from './Container.styles';
import initialState from '../../const/initialState';

export default class Container extends Component {
    constructor(props) {
        super(props);
        const localState = JSON.parse(localStorage.getItem('state'));
        const localTheme = JSON.parse(localStorage.getItem('theme'));
        this.state = {
            settings: false,
            darkColor: localTheme ? localTheme.darkColor : '#535353',
            lightColor: localTheme ? localTheme.lightColor : '#DFDFDF',
            board: localState ? localState.board : initialState.board,
            sideMove: localState ? localState.sideMove : initialState.sideMove,
        };
    }

    handleOpenCloseSettings = () => {
        const { settings, lightColor, darkColor } = this.state;
        this.setState({
            settings: !settings,
            darkColorInput: darkColor,
            lightColorInput: lightColor,
        });
    };

    isColorsValid = () => {
        const { darkColorInput, lightColorInput } = this.state;
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(darkColorInput)
            && /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(lightColorInput)
            && darkColorInput !== lightColorInput;
    };

    lightColorInputChanged = (e) => {
        this.setState({ lightColorInput: e.target.value });
    };

    darkColorInputChanged = (e) => {
        this.setState({ darkColorInput: e.target.value });
    };

    handleSaveSettings = () => {
        const { darkColorInput, lightColorInput } = this.state;
        this.setState({ darkColor: darkColorInput, lightColor: lightColorInput });
        const x = JSON.stringify({ darkColor: darkColorInput, lightColor: lightColorInput });
        localStorage.setItem('theme', x);
    };

    handleSaveState = () => {
        const { board, sideMove } = this.state;
        const x = JSON.stringify({ board, sideMove });
        localStorage.setItem('state', x);
    };

    changeSide = currentSide => this.setState({ sideMove: currentSide === 'W' ? 'B' : 'W' });

    updateBoard = newBoard => this.setState({ board: newBoard });

    handleResetState = () => this.setState({ board: initialState.board, sideMove: initialState.sideMove });

    renderSettings = () => {
        const { darkColorInput, lightColorInput } = this.state;
        return (
            <styled.Settings>
                <styled.SettingsTitle>Settings</styled.SettingsTitle>
                <styled.ColorBlock>
                    <styled.ColorTitle>Dark color:</styled.ColorTitle>
                    <styled.ColorInput
                        value={darkColorInput}
                        onChange={this.darkColorInputChanged}
                    />
                </styled.ColorBlock>
                <styled.ColorBlock>
                    <styled.ColorTitle>Light color:</styled.ColorTitle>
                    <styled.ColorInput
                        value={lightColorInput}
                        onChange={this.lightColorInputChanged}
                    />
                </styled.ColorBlock>
                <styled.ButtonBlock>
                    <styled.ColorSave
                        disabled={!this.isColorsValid()}
                        onClick={this.handleSaveSettings}
                    >
                        Save
                    </styled.ColorSave>
                    <styled.ColorCancel onClick={this.handleOpenCloseSettings}>Cancel</styled.ColorCancel>
                </styled.ButtonBlock>
            </styled.Settings>
        );
    };

    render() {
        const {
            settings, darkColor, lightColor, board, sideMove,
        } = this.state;
        return (
            <styled.Container>
                <styled.Header>
                    <styled.Button disabled>Load</styled.Button>
                    <styled.Button onClick={this.handleResetState}>Reset</styled.Button>
                    <styled.Button onClick={this.handleSaveState}>Save</styled.Button>
                    <styled.Button onClick={this.handleOpenCloseSettings}>Theme</styled.Button>
                </styled.Header>
                <ThemeProvider theme={{ darkColor, lightColor }}>
                    <Board
                        board={board}
                        sideMove={sideMove}
                        actions={{
                            updateBoard: this.updateBoard,
                            changeSide: this.changeSide,
                            reset: this.handleResetState,
                        }}
                    />
                </ThemeProvider>
                {
                    settings && this.renderSettings()
                }
            </styled.Container>
        );
    }
}
