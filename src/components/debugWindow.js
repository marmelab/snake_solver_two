import React from 'react';

const config = CONFIG;
const DebugWindow = (props) => {
    return (
        <aside>
            <p><b>Score: {props.score}</b></p>
            <p>Moves: {props.moves}</p>
            <p>Computation time: {props.computationTime}</p>
            <p>Max tick: {props.maxTick}</p>
        </aside>
    );
};

DebugWindow.defaultProps = {
    score: 0,
    moves: 0,
    maxTick: config.maxStartTick,
    computationTime: 0,
};

DebugWindow.propTypes = {
    score: React.PropTypes.number,
    moves: React.PropTypes.number,
    maxTick: React.PropTypes.number,
    computationTime: React.PropTypes.number,
};

export default DebugWindow;
