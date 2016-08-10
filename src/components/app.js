import React from 'react';
import ReactDom from 'react-dom';
import Grid from './grid';
import DebugMenu from './debugMenu';
import Game from '../game/game';
import { getNextMove } from '../player/computer';

const config = CONFIG;
const game = new Game(config.defaultSize);

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            size: game.size,
            score: game.score,
            snake: game.snake,
            apple: game.apple,
            start: false,
            debug: [],
        };
        this.start = this.start.bind(this);
        this.reset = this.reset.bind(this);
        this.changeSizeGrid = this.changeSizeGrid.bind(this);
    }

    componentWillMount() {
        this.tick();
    }

    start() {
        this.setState({ start: !this.state.start });
    }

    reset() {
        game.init();
        this.setState({
            size: game.size,
            score: game.score,
            snake: game.snake,
            apple: game.apple,
            start: false,
            debug: {},
        });
    }

    changeSizeGrid(event) {
        game.size = event.target.value.split('x').map(size => Number(size));
        this.reset();
    }

    moveSnake() {
        const { nextMove, debug } = getNextMove(game);
        game.nextTick(nextMove);
        this.setState({
            score: game.score,
            snake: game.snake,
            apple: game.apple,
            debug,
        });
    }

    tick() {
        setTimeout(() => {
            if (game.isWon()) {
                this.setState({ start: false });
            }

            if (!this.state.start) {
                this.tick();
                return;
            }

            this.moveSnake();
            this.tick();

            if (game.isLost()) {
                this.setState({ start: false });
            }
        }, config.speed);
    }

    renderMessage() {
        let message = '';

        if (game.isWon()) {
            message = 'You win !';
        }

        if (game.isLost()) {
            message = 'You lose..';
        }

        return <div className="message">{message}</div>;
    }

    render() {
        const buttonTxt = this.state.start ? 'Stop' : 'Start';
        return (
            <div>
                <Grid
                    size={this.state.size}
                    snake={this.state.snake}
                    apple={this.state.apple}
                    message={this.renderMessage()}
                />
                <aside>
                    <DebugMenu
                        computationTime={this.state.debug.computationTime}
                        bestMoveScore={this.state.debug.bestMoveScore}
                        maxTick={this.state.debug.maxTick}
                        moves={this.state.debug.moves}
                        score={this.state.score}
                    />
                    <div className="menu">
                        <button onClick={this.start}>{buttonTxt}</button>
                        <button onClick={this.reset}>Reset</button>
                        <select onChange={this.changeSizeGrid}>
                            <option>5x5</option>
                            <option>8x8</option>
                            <option>10x10</option>
                        </select>
                    </div>
                </aside>
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
