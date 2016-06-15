import React from 'react';
import ReactDom from 'react-dom';
import Grid from './grid';
import Game from '../game/game';
import { getNextMove } from '../player/computer';

const size = [10, 10];
const speed = 100;
const game = new Game(size);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: game.getGrid(),
            score: game.score,
        };
    }

    componentWillMount() {
        this.tick();
    }

    tick() {
        try {
            setTimeout(() => {
                const nextMove = getNextMove(game);
                game.nextTick(nextMove);
                this.setState({
                    grid: game.getGrid(),
                    score: game.score,
                });
                this.tick();
            }, speed);
        } catch (e) {
            console.log('Finish !');
        }
    }

    render() {
        return (
            <div>
                <div className="score">Score: {this.state.score}</div>
                <Grid size={size} grid={this.state.grid} />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
