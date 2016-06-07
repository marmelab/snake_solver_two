import React from 'react';
import Cell from './cell';

class Grid extends React.Component {
    render() {
        const cells = [];
        for (let i = 0; i < this.props.width; i++) {
            cells.push(<Cell key={i} />);
        }

        const lines = [];
        for (let i = 0; i < this.props.height; i++) {
            lines.push(<div key={i}>{cells}</div>);
        }

        return (
            <div id="grid">{lines}</div>
        );
    }
}

Grid.propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
};

export default Grid;
