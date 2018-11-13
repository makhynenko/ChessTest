import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as styled from './Board.styles';
import figures from '../../const/figures';
import { getOptions, getWinner } from './data';

export default class Board extends Component {
    static propTypes = {
        board: PropTypes.arrayOf(PropTypes.string).isRequired,
        sideMove: PropTypes.string.isRequired,
        actions: PropTypes.shape().isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedCell: null,
            options: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ winner: getWinner(nextProps.board) });
    }

    move = (endPosition) => {
        const { selectedCell } = this.state;
        const { board, sideMove, actions } = this.props;
        const figure = board[selectedCell];
        const newBoard = board.map((c, i) => {
            if (i === endPosition) {
                return figure;
            }
            if (i === selectedCell) {
                return 'empty';
            }
            return c;
        });
        actions.changeSide(sideMove);
        actions.updateBoard(newBoard);
        this.setState({
            selectedCell: null,
            options: [],
        });
    };

    handleOnClick = (key) => {
        const { selectedCell, options, winner } = this.state;
        const { board, sideMove } = this.props;
        if (!winner && !selectedCell && board[key].split('')[0] === sideMove) {
            this.setState({ selectedCell: key, options: getOptions(key, board) });
        } else if (options.includes(key)) {
            this.move(key);
        } else {
            this.setState({ selectedCell: null, options: [] });
        }
    };

    isDarkCell = key => (Math.floor(key / 10) + (key % 10)) % 2 === 0;

    renderBlock = (content, key) => {
        const { selectedCell, options } = this.state;
        return (
            <styled.Cell
                onClick={() => this.handleOnClick(key)}
                figure={figures[content]}
                key={key}
                isSelected={selectedCell === key}
                isDarkCell={this.isDarkCell(key)}
                isAvailable={options.includes(key)}
            />
        );
    };

    render() {
        const { board, actions } = this.props;
        const { winner } = this.state;
        return (
            <styled.BoardContainer>
                { board.map((c, i) => (c === 'limit' ? null : this.renderBlock(c, i))) }
                { winner && (
                    <styled.WinLabel>
                        <styled.Title>{winner} Won!</styled.Title>
                        <styled.ResetButton onClick={actions.reset}>Play Again</styled.ResetButton>
                    </styled.WinLabel>
                )}
            </styled.BoardContainer>
        );
    }
}
