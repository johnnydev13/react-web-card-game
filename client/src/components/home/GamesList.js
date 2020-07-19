import React from 'react';
import GameRow from './GameRow';
import InfoMessage from '../elements/InfoMessage';
import { Table } from 'react-bootstrap';

export default class GamesList extends React.PureComponent {
    renderGames = () => {
        let { games } = this.props;

        return games.map((game, index) => (
            <GameRow
                index={index}
                key={index}
                name={game.name}
                players={game.players}
                maxPlayers={game.maxPlayers}
                gameId={game.id}
            />
        ))
    };

    render() {
        let { games } = this.props;

        if (games.length === 0) {
            return <InfoMessage text={'Games not found'}/>
        }

        return (
            <Table  hover className={'games-list'}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Players</th>
                    <th>Control</th>
                </tr>
                </thead>
                <tbody>
                {this.renderGames()}
                </tbody>
            </Table>
        )
    }
}
