import React from 'react';

const config = CONFIG;
const cellStyle = {
    width: config.cellSize,
    height: config.cellSize,
    outline: (config.displayGrid) ? '1px solid grey' : 'none',
};

const Cell = (props) => <div className={props.type} style={cellStyle}></div>;
Cell.propTypes = {
    type: React.PropTypes.string,
};

export default Cell;
