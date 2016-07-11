import React from 'react';
import ReactDom from 'react-dom';
import Grid from './grid';
import DebugWindow from './debugWindow';
import Game from '../game/game';
import { getNextMove } from '../player/computer';

const config = CONFIG;
const game = new Game([config.width, config.height]);

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            grid: game.getGrid(),
            score: game.score,
            snake: game.snake,
            debug: [],
            start: false,
        };
        this.start = this.start.bind(this);
        this.restart = this.restart.bind(this);
    }

    componentWillMount() {
        this.tick();
    }

    start() {
        this.setState({ start: !this.state.start });
    }

    restart() {
        this.setState({ start: true });
        game.init();
    }

    tick() {
        setTimeout(() => {
            if (!this.state.start) {
                this.tick();
                return;
            }

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
        const buttonTxt = this.state.start ? 'Stop' : 'Start';
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
                <button onClick={this.start}>{buttonTxt}</button>
                <button onClick={this.restart}>Restart</button>
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
