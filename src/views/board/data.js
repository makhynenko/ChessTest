const horseOffsets = [-21, -19, -12, -8, 8, 12, 19, 21];
const kingOffsets = [-1, -9, -10, -11, 1, 9, 10, 11];

export const getWinner = (board) => {
    const whiteWin = !board.some(c => c === 'BK');
    const blackWin = !board.some(c => c === 'WK');
    if (blackWin || whiteWin) {
        return blackWin ? 'Black' : 'White';
    }
    return null;
};

const getPawnOptions = (key, board, side) => {
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

const getOptionsByOffsets = (key, board, side, offsets) => offsets.filter((p) => {
    const validatedCell = board[key + p];
    return (validatedCell === 'empty' || (validatedCell !== 'limit' && validatedCell.split('')[0] !== side));
}).map(o => key + o);

const getKingOptions = (key, board, side) => getOptionsByOffsets(key, board, side, kingOffsets);

const getHorseOptions = (key, board, side) => getOptionsByOffsets(key, board, side, horseOffsets);

const recursiveStep = (key, board, side, offset, options = []) => {
    const validatedKey = key + offset;
    const validatedCell = board[validatedKey];
    if (validatedCell !== 'limit') {
        if (validatedCell !== 'empty') {
            if (validatedCell.split('')[0] !== side) {
                return [...options, validatedKey];
            }
            return options;
        }
        return recursiveStep(validatedKey, board, side, offset, [...options, validatedKey]);
    }
    return options;
};

const getRookOptions = (key, board, side) => ([
    ...recursiveStep(key, board, side, 10),
    ...recursiveStep(key, board, side, -10),
    ...recursiveStep(key, board, side, -1),
    ...recursiveStep(key, board, side, 1),
]);

const getBishopOptions = (key, board, side) => ([
    ...recursiveStep(key, board, side, 9),
    ...recursiveStep(key, board, side, 11),
    ...recursiveStep(key, board, side, -9),
    ...recursiveStep(key, board, side, 11),
]);

const getQueenOptions = (key, board, side) => ([
    ...recursiveStep(key, board, side, 9),
    ...recursiveStep(key, board, side, 11),
    ...recursiveStep(key, board, side, -9),
    ...recursiveStep(key, board, side, 11),
    ...recursiveStep(key, board, side, 10),
    ...recursiveStep(key, board, side, -10),
    ...recursiveStep(key, board, side, -1),
    ...recursiveStep(key, board, side, 1),
]);

export const getOptions = (key, board) => {
    const [side, figure] = board[key].split('');
    switch (figure) {
        case 'P': {
            return getPawnOptions(key, board, side);
        }
        case 'H': {
            return getHorseOptions(key, board, side);
        }
        case 'R': {
            return getRookOptions(key, board, side);
        }
        case 'S': {
            return getBishopOptions(key, board, side);
        }
        case 'Q': {
            return getQueenOptions(key, board, side);
        }
        case 'K': {
            return getKingOptions(key, board, side);
        }
        default:
            return [];
    }
};
