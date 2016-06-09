import React from 'react';

const Cell = (props) => (<div className={props.type}></div>);
Cell.propTypes = {
    type: React.PropTypes.string,
};

export default Cell;
