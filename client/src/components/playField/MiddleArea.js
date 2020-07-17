import React from 'react';
import LeftEnemyCards from "./middleArea/LeftEnemyCards";
import RightEnemyCards from "./middleArea/RightEnemyCards";
import DealArea from "./middleArea/DealArea";

export default class MiddleArea extends React.PureComponent {
    render() {
        let {leftPlayer, rightPlayer} = this.props;

        return (
            <div
                ref={(el) => {
                    if (!el) {
                        return false;
                    }
                    this.props.setDealAreaBounds(el.getBoundingClientRect());
                }}
                className="middle-area">
                <LeftEnemyCards player={leftPlayer}/>
                <DealArea/>
                <RightEnemyCards player={rightPlayer}/>
            </div>
        );
    }
}
