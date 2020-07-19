import React from 'react';
import SideEnemyCards from "./middleArea/SideEnemyCards";
import DealArea from "./middleArea/DealArea";

export default class MiddleArea extends React.PureComponent {
    render() {
        let {
            leftPlayer,
            rightPlayer,
            playersRendered,
            setDealAreaBounds,
            setPlayerBounds,
            dealCards,
            dealAreaBounds,
            isClearingDealArea,
            playersCount,
            dealMessage,
        } = this.props;

        return (
            <div
                className="middle-area">
                <SideEnemyCards
                    containerClass={'left-enemy-cards'}
                    player={leftPlayer}
                    dealAreaBounds={dealAreaBounds}
                    setPlayerBounds={setPlayerBounds}
                />
                <DealArea
                    dealMessage={dealMessage}
                    playersCount={playersCount}
                    isClearingDealArea={isClearingDealArea}
                    dealCards={dealCards}
                    setDealAreaBounds={setDealAreaBounds}
                    playersRendered={playersRendered}
                />
                <SideEnemyCards
                    containerClass={'right-enemy-cards'}
                    player={rightPlayer}
                    dealAreaBounds={dealAreaBounds}
                    setPlayerBounds={setPlayerBounds}
                />
            </div>
        );
    }
}
