import React from 'react';
import { Card } from 'react-bootstrap';
import MainButton from '../elements/MainButton';

export default class NewGameCard extends React.PureComponent {
    startGame = () => {
        let {login, name, roomId, startGameRequest, playersCount, goToRoom} = this.props;

        if (login === '') {
            // show error here
            return false;
        }
        if (roomId) {
            return goToRoom(roomId);
        }

        startGameRequest(login, name, playersCount);

        //goToRoom(roomId);
    };

    render() {
        let { playersCount } = this.props;

        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{playersCount} players game</Card.Title>
                    <Card.Text>
                        Start a {playersCount} players game
                    </Card.Text>
                    <MainButton onClick={this.startGame} text={'Start'}/>
                </Card.Body>
            </Card>
        )
    }
}
