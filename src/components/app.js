import React from 'react';
import ReactDom from 'react-dom';
import Grid from './grid';
import Game from '../game/game';
import { getNextMove } from '../player/computer';
import * as config from '../js/config';

const game = new Game(config.size);

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
                const nextMove = getNextMove(game);
                game.nextTick(nextMove);
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
