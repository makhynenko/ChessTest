import React, { Component } from 'react';
import * as styled from './Board.styles';
import initialState from '../../const/initialBoard';
import figures from '../../const/figures';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: initialState,
            sideMove: 'W',
            selectedCell: null,
            options: [],
        };
    }

    getHorseOptions = (key, board, side) => {
        const options = [];
        [-21, -19, -12, -8, 8, 12, 19, 21].forEach((p) => {
            const validatedCell = board[key + p];
            return (validatedCell === 'empty' || (validatedCell !== 'limit' && validatedCell.split('')[0] !== side))
                && options.push(key + p);
        });
        return options;
    };

    getPawnOptions = (key, board, side) => {
        const options = [];
        const q = side === 'W' ? -1 : 1;
        const pawnRow = parseInt(key / 10, 10);
        const availableSteps = (pawnRow === 3 || pawnRow === 8) ? 2 : 1;
        for (let i = 1; i <= availableSteps; i++) {
            const validatedKey = key + i * 10 * q;
            if (board[validatedKey] === 'empty') options.push(validatedKey);
        }
        [9, 11].forEach(p => board[key + (q * p)] !== 'empty' && board[key + (q * p)] !== 'limit'
            && board[key + (q * p)].split('')[0] !== side && options.push(key + (q * p)));
        return options;
    };

    getOptions = (key, board) => {
        const [side, figure] = board[key].split('');
        switch (figure) {
            case 'P': {
                return this.getPawnOptions(key, board, side);
            }
            case 'H': {
                return this.getHorseOptions(key, board, side);
            }
            default:
                return [];
        }
    };

    move = (endPosition) => {
        const { selectedCell, board, sideMove } = this.state;
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
        this.setState({
            board: newBoard,
            sideMove: sideMove === 'W' ? 'B' : 'W',
            selectedCell: null,
            options: [],
        });
    };

    handleOnClick = (key) => {
        const { selectedCell, board, sideMove, options } = this.state;
        if (!selectedCell && board[key].split('')[0] === sideMove) {
            this.setState({ selectedCell: key, options: this.getOptions(key, board) });
        } else if (options.includes(key)) {
            this.move(key);
        } else {
            this.setState({ selectedCell: null, options: [] });
        }
    };

    renderBlock = (content, key) => {
        const { selectedCell, options } = this.state;
        return (
            <styled.Cell
                onClick={() => this.handleOnClick(key)}
                figure={figures[content]}
                key={key}
                isSelected={selectedCell === key}
                isAvailable={options.includes(key)}
            />
        );
    };

    render() {
        return (
            <styled.BoardContainer>
                { this.state.board.map((c, i) => (c === 'limit' ? null : this.renderBlock(c, i))) }
            </styled.BoardContainer>
        );
    }
}
