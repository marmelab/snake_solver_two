import React from 'react';
import ReactDom from 'react-dom';
import Grid from './grid';

const width = 10;
const height = 10;

class App extends React.Component {
    render() {
        return (
            <Grid width={width} height={height} />
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
