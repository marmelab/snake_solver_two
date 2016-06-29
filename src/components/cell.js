import React from 'react';

const cellStyle = {
    width: 250 / CONFIG.width,
    height: 250 / CONFIG.height,
    outline: (CONFIG.displayGrid) ? '1px solid grey' : 'none',
};

const Cell = (props) => (<div className={props.type} style={cellStyle}></div>);
Cell.propTypes = {
    type: React.PropTypes.string,
};

export default Cell;
