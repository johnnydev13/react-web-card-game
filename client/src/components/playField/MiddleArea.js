import React from 'react';
import SideEnemyCards from "./middleArea/SideEnemyCards";
import DealArea from "./middleArea/DealArea";
import {cardThrow as cardThrowConfig} from '../../config/animation';

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
        } = this.props;

        return (
            <div
                className="middle-area">
                <SideEnemyCards
                    throwType={cardThrowConfig.types.second}
                    containerClass={'left-enemy-cards'}
                    player={leftPlayer}
                    dealAreaBounds={dealAreaBounds}
                    setPlayerBounds={setPlayerBounds}
                />
                <DealArea
                    playersCount={playersCount}
                    isClearingDealArea={isClearingDealArea}
                    dealCards={dealCards}
                    setDealAreaBounds={setDealAreaBounds}
                    playersRendered={playersRendered}
                />
                <SideEnemyCards
                    throwType={cardThrowConfig.types.fifth}
                    containerClass={'right-enemy-cards'}
                    player={rightPlayer}
                    dealAreaBounds={dealAreaBounds}
                    setPlayerBounds={setPlayerBounds}
                />
            </div>
        );
    }
}
