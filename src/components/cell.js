import React from 'react';
import * as config from '../js/config';

const cellStyle = {
    width: 250 / config.width,
    height: 250 / config.height,
};

const Cell = (props) => (<div className={props.type} style={cellStyle}></div>);
Cell.propTypes = {
    type: React.PropTypes.string,
};

export default Cell;
