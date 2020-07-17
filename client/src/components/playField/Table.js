import React from 'react';
import './styles.scss';
import LowArea from './LowArea';
import TopArea from './TopArea';
import MiddleArea from './MiddleArea';

export default class Table extends React.PureComponent {
    render() {
        let { me, topPlayers, rightPlayer, leftPlayer, onMyCardClick } = this.props;
        return (
            <div className="game-table">
                <TopArea topPlayers={topPlayers}/>

                <MiddleArea rightPlayer={rightPlayer} leftPlayer={leftPlayer}/>

                <LowArea
                    me={me}
                    onMyCardClick={onMyCardClick}
                />
            </div>
        );
    }
}
