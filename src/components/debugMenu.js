import React from 'react';

const config = CONFIG;
const DebugMenu = (props) => {
    return (
        <div className="menu">
            <p><b>Score: {props.score}</b></p>
            <p>Possible moves: {props.moves}</p>
            <p>Computation time: {props.computationTime}ms</p>
            <p>Best move score: {props.bestMoveScore}</p>
            <p>Max tick: {props.maxTick}</p>
        </div>
    );
};

DebugMenu.defaultProps = {
    maxTick: config.maxStartTick,
    computationTime: 0,
    bestMoveScore: 0,
    score: 0,
    moves: 0,
};

DebugMenu.propTypes = {
    score: React.PropTypes.number,
    moves: React.PropTypes.number,
    maxTick: React.PropTypes.number,
    bestMoveScore: React.PropTypes.number,
    computationTime: React.PropTypes.number,
};

export default DebugMenu;
