import React from "react";
import {Link} from "react-router-dom";

export default class Home extends React.PureComponent {
    componentWillReceiveProps(nextProps) {
        if (nextProps.roomId) {
            this.goToRoom(nextProps.roomId);
        }
    }
    componentDidMount() {

    }

    startGame = () => {
        if (this.props.login === '') {
            // show error here
            return false;
        }
        if (this.props.roomId) {
            return this.goToRoom(this.props.roomId);
        }

        this.props.startGameRequest(this.props.login, this.props.name, 3);
    };
    findGames = () => {
        if (this.props.login === '') {
            // show error here
            return false;
        }
        if (this.props.roomId) {
            return this.goToRoom(this.props.roomId);
        }

        this.props.findGamesRequest();
    };
    goToRoom = (roomId) => {
        this.props.history.push('/game/' + roomId)
    };
    connectToGame = (gameId) => {

    };

    renderIserInfo() {
        if (this.props.login === '') {
            return (
                <div>Hello Unknown player. To play you need <Link to='/user'>to set your login</Link></div>
            )
        }

        return (
            <div>Hello <Link to='/user'>{this.props.login}</Link></div>
        )
    }

    render () {
        return (
            <div>
                {this.renderIserInfo()}
                <div onClick={this.startGame}>
                    Start a game
                </div>
                <div onClick={this.findGames} style={{marginTop: '20px', marginBottom: '20px'}}>
                    Get open games
                </div>

                <div>
                    {this.props.availableGames.map((game, index) => (
                        <div key={index}>
                            {game.name} {game.players}/{game.maxPlayers} players

                            <Link to={'/game/' + game.id}>Connect to game</Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
