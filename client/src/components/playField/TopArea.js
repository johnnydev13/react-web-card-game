import React from 'react';
import TopEnemyCards from './topArea/TopEnemyCards';

export default class TopArea extends React.PureComponent {
    render() {
        let { topPlayers } = this.props;

        if (topPlayers.length === 0) {
            return false;
        }

        return (
            <div className="top-area">
                {topPlayers.map((player, index) =>
                    <TopEnemyCards key={index} player={player}/>
                )}
            </div>
        );
    }
}
/**/
