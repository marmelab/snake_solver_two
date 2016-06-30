import React from 'react';

const cellStyle = {
    width: CONFIG.cellSize,
    height: CONFIG.cellSize,
    outline: (CONFIG.displayGrid) ? '1px solid grey' : 'none',
};

const Cell = (props) => (<div className={props.type} style={cellStyle}></div>);
Cell.propTypes = {
    type: React.PropTypes.string,
};

export default Cell;
