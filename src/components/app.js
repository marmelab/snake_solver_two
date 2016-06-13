import React from 'react';
import ReactDom from 'react-dom';
import Grid from './grid';
import Game from '../game/game';
import getNextMove from '../player/computer';

const size = [5, 5];
const speed = 1000;
const game = new Game(size);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            snake: game.getSnake(),
            apple: game.getApple(),
        };
    }

    componentWillMount() {
        this.tick();
    }

    tick() {
        try {
            setTimeout(() => {
                const nextMove = getNextMove();
                game.nextTick(nextMove);
                this.setState({
                    snake: game.getSnake(),
                    apple: game.getApple(),
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
                <Grid size={size} />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('app'));
