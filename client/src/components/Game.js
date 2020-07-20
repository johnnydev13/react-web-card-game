import React from 'react';
import LinkButton from './elements/LinkButton';
import InfoMessage from './elements/InfoMessage';
import { ListGroup, ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Game extends React.PureComponent {
    state = {
        gameStarted: false,
    };

    componentDidMount() {
        this.props.connectToGameRequest(
            this.props.match.params.roomId,
            this.props.login,
            this.props.name
        );
    }

    static getDerivedStateFromProps(props, state) {
        if (props.gameStarted && !state.gameStarted) {
            props.history.push('/game/' + props.roomId + '/play');

            return {
                gameStarted: true,
            }
        }

        return null;
    }

    goBack = () => {
        this.props.history.push('/')
    };
    renderError = () =>  {
        if (this.props.errorMessage === '') {
            return false;
        }

        return (
            <div>Error: {this.props.errorMessage}</div>
        )
    };
    renderPlayers = () => {
        if (this.props.players.length === 0) {
            return <InfoMessage text={'Something went horribly wrong, no players found'}/>;
        }

        let rows = [];
        this.props.players.forEach((player, index) => {
            rows.push(<ListGroup.Item key={player.id}>{player.login} — {player.name}</ListGroup.Item>)
        });

        return (
            <ListGroup>
                <ListGroup.Item active>Connected players:</ListGroup.Item>
                {rows}
            </ListGroup>);
    };

    render () {
        return (
            <div className={'body'}>
                <h2>Waiting for players</h2>
                <ProgressBar animated now={100} />
                <LinkButton onClick={this.goBack} text={'<--- return to the Home page'}/>

                {this.renderError()}
                {this.renderPlayers()}
            </div>
        );
    }
}

let playerShape = PropTypes.shape({
    id: PropTypes.string,
    login: PropTypes.string,
    name: PropTypes.string,
});

Game.propTypes = {
    roomId: PropTypes.string,
    gameStarted: PropTypes.bool,
    errorMessage: PropTypes.string,
    players: PropTypes.arrayOf(playerShape),
    login: PropTypes.string,
    name: PropTypes.string,
};
