import React from "react";
import { Link } from "react-router-dom";
import NewGameCard from "./home/NewGameCard";
import GamesList from "./home/GamesList";
import { minPlayers, maxPlayers } from '../config/game';
import SecondaryButton from "./elements/SecondaryButton";

export default class Home extends React.PureComponent {
    state = {
        roomId: this.props.roomId,
    };

    static getDerivedStateFromProps(props, state) {
        if (state.roomId !== props.roomId) {
            props.history.push('/game/' + props.roomId);
            return {...state, roomId: props.roomId};
        }

        return state;
    }

    startGame = () => {
        let {login, name, roomId, startGameRequest} = this.props;

        if (login === '') {
            // show error here
            return false;
        }
        if (roomId) {
            return this.goToRoom(roomId);
        }

        startGameRequest(login, name, 2);
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

    renderUserInfo() {
        if (this.props.login === '') {
            return (
                <div>Hello Unknown player. To play you need <Link to='/user'>to set your login</Link></div>
            )
        }

        return (
            <div>Hello <Link to='/user'>{this.props.login}</Link></div>
        )
    }

    renderStartButtons = () => {
        let {login, name, roomId, startGameRequest} = this.props;

        let buttons = [];

        for (let i = minPlayers; i <= maxPlayers; i++) {
            buttons.push(<NewGameCard
                goToRoom={this.goToRoom}
                key={i}
                login={login}
                name={name}
                roomId={roomId}
                startGameRequest={startGameRequest}
                playersCount={i}
            />)
        }

        return <div className={'buttons'}>{buttons}</div>;
    };

    render () {
        let { availableGames } = this.props;
        return (
            <div className={'body'}>
                <h1 className={'center'}>React JS Test Task</h1>

                {this.renderUserInfo()}
                {this.renderStartButtons()}

                <SecondaryButton
                    text={'Find available games'}
                    onClick={this.findGames}
                />

                <GamesList
                    games={availableGames}
                />
            </div>
        );
    }
}
