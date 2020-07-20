import React from "react";
import Toast from './elements/Toast';
import Modal from './elements/Modal';
import PropTypes from 'prop-types';

export default class Header extends React.PureComponent {
    renderError = () => {
        let { globalError } = this.props;

        if (!globalError) {
            return false;
        }

        return (
            <Toast
                onClick={this.props.hideGlobalError}
                title={'An error has occurred'}
                text={globalError}
            />
        )
    };

    renderGameResults = () => {
        let { gameResults, login } = this.props;

        if (Object.keys(gameResults).length === 0) {
            return false;
        }

        let rows = [];

        /*gameResults.sort((a, b) => {
            if (a.scores < b.scores) { return 1; }
            if (a.scores > b.scores) { return -1; }
            return 0;
        });*/

        Object.keys(gameResults).forEach(score => {
            let players = gameResults[score];

            let playersRows = [];

            players.forEach((player, index) => {
                playersRows.push(
                    <span key={index} className={'player ' + (player.isWinner ? 'winner' : 'loser')}>
                        {player.name}: {player.wins} wins <small className={'player-result'}>[{player.isWinner ? 'WIN' : 'LOSE'}]</small>{login === player.login ? <strong> — You</strong> : ''}
                    </span>)
            });
            rows.push(
                <span key={score} className="player-row">
                    <span className="title">{score} scores:</span>
                    <span className="value">{playersRows}</span>
                </span>);
        });

        return (
            <Modal
                onClose={() => {
                    this.props.hideGameResults();

                    this.props.history.push('/');
                }}
                title={'Game results'}
                text={rows}
            />
        )
    };

    render() {
        return (
            <div className={'header'}>
                {this.renderGameResults()}

                <div className={'errors'}>
                {this.renderError()}

                </div>
            </div>
        )
    }
}

let resultRowShape = PropTypes.shape({
    isWinner: PropTypes.bool,
    name: PropTypes.string,
    wins: PropTypes.number,
    login: PropTypes.string,
});

Header.propTypes = {
    globalError: PropTypes.string.isRequired,
    gameResults: PropTypes.objectOf(PropTypes.arrayOf(resultRowShape)),
    login: PropTypes.string,
};
