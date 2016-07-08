import React from 'react';

const DebugBar = (props) => {
    return (
        <aside>
            <p>Score: {props.score}</p>
            <p>Moves: {props.moves}</p>
            <p>Computation time: {props.computationTime}</p>
        </aside>
    );
};

DebugBar.propTypes = {
    score: React.PropTypes.number,
    moves: React.PropTypes.number,
    computationTime: React.PropTypes.number,
};

export default DebugBar;
