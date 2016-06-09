import React from 'react';
import ReactDom from 'react-dom';
import { Grid, generateGrid } from './grid';
import PathFind from '../js/pathFind';

let queue = [];
let apple = [4, 4];
let score = 0;

const speed = 10;
const width = 10;
const height = 10;
const snake = [[2, 0], [2, 1], [2, 2]];

const random = () => {
    apple = [Math.floor((Math.random() * 9)), Math.floor((Math.random() * 9))];
};

const update = () => {
    if (!queue.length) {
        const grid = generateGrid(width, height, snake, apple);
        const pathFind = new PathFind(snake, apple, grid);
        const path = pathFind.solve();
        queue = path;
    }

    if (queue[0]) {
        snake.push(queue.shift());
    }

    if (JSON.stringify(snake[snake.length - 1]) === JSON.stringify(apple)) {
        score++;
        random();
    } else {
        snake.shift();
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            snake,
            apple,
        };
    }

    componentWillMount() {
        this.tick();
    }

    tick() {
        setTimeout(() => {
            update();
            this.setState({ snake, apple, score });
            this.tick();
        }, speed);
    }

    render() {
        return (
            <div>
                <div className="score">Score: {this.state.score}</div>
                <Grid
                    width={width}
                    height={height}
                    snake={this.state.snake}
                    apple={this.state.apple}
                />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
