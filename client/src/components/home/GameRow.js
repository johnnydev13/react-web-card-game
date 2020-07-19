import React from 'react';
import {Link} from "react-router-dom";

export default class GameRow extends React.PureComponent {
    render() {
        let { players, maxPlayers, gameId, index} = this.props;

        return (
            <tr>
                <td>{index + 1}</td>
                <td>Game#{gameId}</td>
                <td>{players}/{maxPlayers}</td>
                <td><Link to={'/game/' + gameId}>Connect to game</Link></td>
            </tr>
        );
    }
}
