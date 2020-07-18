import React from "react";
import {Link} from "react-router-dom";

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

    renderError() {
        if (!this.props.errorMessage) {
            return false;
        }

        return (
            <div>Error: {this.props.errorMessage}</div>
        )
    }
    renderPlayers() {
        if (this.props.players.length === 0) {
            return false;
        }

        return this.props.players.map((player, index) => {
            return <div key={player.id}>{player.login} — {player.name}</div>
        });
    }
    render () {
        return (
            <span>
                Game
                <br/>
                <Link to='/'>Go back Home</Link>

                {this.renderError()}
                {this.renderPlayers()}
            </span>
        );
    }
}
