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
            infos: [],
        };
    }

    componentWillMount() {
        this.tick();
    }

    tick() {
        setTimeout(() => {
            try {
                const nextMove = getNextMove(game);
                game.nextTick(nextMove[0]);
                this.setState({
                    grid: game.getGrid(),
                    score: game.score,
                    snake: game.snake,
                    infos: nextMove[1],
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
                    computationTime={this.state.infos.computationTime}
                    bestMoveScore={this.state.infos.bestMoveScore}
                    score={this.state.score}
                    maxTick={this.state.infos.maxTick}
                    moves={this.state.infos.moves}
                />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
