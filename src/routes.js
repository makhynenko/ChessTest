import React from 'react';
import {
    BrowserRouter as Router,
    Route, Switch, Redirect,
} from 'react-router-dom';

import Home from './views/home/Home';
import Board from './views/board/Board';

export default () => (
    <Router>
        <Switch>
            <Route path="/game" component={Board} />
            <Route path="/home" component={Home} />
            <Redirect to="/game" />
        </Switch>
    </Router>
);
