import React from 'react';
import ReactDom from 'react-dom';
import Grid from './grid';
import Game from '../js/game';

const [width, height, speed] = [5, 5, 10];
const snake = [[2, 0], [2, 1], [2, 2]];
const apple = [4, 4];
const game = new Game(width, height, snake, apple);

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
            game.next();
            this.setState({
                snake: game.snake,
                apple: game.apple,
                score: game.score,
            });
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
