import React from 'react';
import ReactDom from 'react-dom';
import Grid from './grid';
import DebugWindow from './debugWindow';
import Game from '../game/game';
import { getNextMove } from '../player/computer';

const config = CONFIG;
const game = new Game([config.width, config.height]);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: game.getGrid(),
            score: game.score,
            snake: game.snake,
            debug: [],
        };
    }

    componentWillMount() {
        this.tick();
    }

    tick() {
        setTimeout(() => {
            try {
                const { nextMove, debug } = getNextMove(game);
                game.nextTick(nextMove);
                this.setState({
                    grid: game.getGrid(),
                    score: game.score,
                    snake: game.snake,
                    debug,
                });
                this.tick();
            } catch (e) {
                console.log(e.message);
                console.log('Finish !');
            }
            this.setState({
                grid: game.getGrid(),
                score: game.score,
                snake: game.snake,
            });
        }, config.speed);
    }

    renderMessage() {
        if (game.isWon()) {
            return (<div className="message">You win !</div>);
        }

        if (game.isLost()) {
            return (<div className="message">You lose..</div>);
        }

        return false;
    }

    render() {
        return (
            <div>
                {this.renderMessage()}
                <Grid grid={this.state.grid} snake={this.state.snake} />
                <DebugWindow
                    computationTime={this.state.debug.computationTime}
                    bestMoveScore={this.state.debug.bestMoveScore}
                    maxTick={this.state.debug.maxTick}
                    moves={this.state.debug.moves}
                    score={this.state.score}
                />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
