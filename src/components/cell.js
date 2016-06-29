import React from 'react';

const cellStyle = {
    width: 250 / CONFIG.width,
    height: 250 / CONFIG.height,
};

const Cell = (props) => (<div className={props.type} style={cellStyle}></div>);
Cell.propTypes = {
    type: React.PropTypes.string,
};

export default Cell;
