import React from 'react';
import ReactDom from 'react-dom';
import Grid from './grid';
import Game from '../game/game';
import { getNextMoves } from '../player/computer';

const config = CONFIG;
const game = new Game([config.width, config.height]);
let movesQueue = [];

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: game.getGrid(),
            score: game.score,
            snake: game.snake,
        };
    }

    componentWillMount() {
        this.tick();
    }

    tick() {
        setTimeout(() => {
            try {
                if (game.isSnakeEating) {
                    movesQueue = [];
                }

                if (!movesQueue.length) {
                    const [path, hasFoundApple] = getNextMoves(game);
                    if (hasFoundApple) {
                        movesQueue = Array.from(path);
                    } else {
                        movesQueue = [path[0]];
                    }
                }

                game.nextTick(movesQueue.shift());
                this.setState({
                    grid: game.getGrid(),
                    score: game.score,
                    snake: game.snake,
                });
                this.tick();
            } catch (e) {
                console.log(e.message);
                console.log('Finish !');
            }
        }, config.speed);
    }

    render() {
        return (
            <div>
                <div className="score">Score: {this.state.score}</div>
                <Grid grid={this.state.grid} snake={this.state.snake} />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
