import React from 'react';
import Cell from './cell';

const Grid = ({ size }) => {
    const totalCells = size.reduce((width, height) => width * height);
    const cells = [];

    for (let i = 0; i < totalCells; i++) {
        cells.push(<Cell key={i} />);
    }

    return <div id="grid">{cells}</div>;
};

Grid.propTypes = {
    size: React.PropTypes.array.isRequired,
};

export default Grid;
