import React from 'react';
import ReactDom from 'react-dom';
import { Grid, generateGrid } from './grid';
import PathFind from '../js/pathFind';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            queue: [],
            speed: 100,
            width: 10,
            height: 10,
            snake: [[2, 0], [2, 1], [2, 2]],
            apple: [4, 4],
        };
    }

    componentWillMount() {
        this.tick();
    }

    random() {
        this.setState({ apple: [9, 9] });
    }

    update() {
        const head = this.state.snake[this.state.snake.length - 1];
        const grid = generateGrid(this.state.width, this.state.height, this.state.snake, this.state.apple);
        const pathFind = new PathFind(head, this.state.apple, grid);

        if (!this.state.queue.length) {
            const path = pathFind.recursiveSolve(head);
            this.state.queue = path;
        }

        this.state.queue.shift();
        this.state.snake.push(this.state.queue[0]);

        if (JSON.stringify(head) === JSON.stringify(this.state.apple)) {
            this.random();
        } else {
            this.state.snake.shift();
        }

        this.setState({ snake: this.state.snake });
    }

    tick() {
        setTimeout(() => {
            this.update();
            this.tick();
        }, this.state.speed);
    }

    render() {
        return (
            <Grid
                width={this.state.width}
                height={this.state.height}
                snake={this.state.snake}
                apple={this.state.apple}
            />
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
