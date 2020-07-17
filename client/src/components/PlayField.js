import React from "react";
import './playField/styles';
import LowArea from './playField/LowArea';
import TopArea from './playField/TopArea';
import MiddleArea from './playField/MiddleArea';

export default class PlayField extends React.PureComponent {
    componentDidMount() {
        if (!this.props.roomId) {
            // page refreshed, need to get game data from a server
            this.props.getGameDataRequest(this.props.match.params.roomId, this.props.login)
        }
    }

    setDealAreaBounds = (bounds) => {
        this.props.saveDealAreaBounds(bounds.width, bounds.height, bounds.top, bounds.left);
    };

    onMyCardClickHandle = (code, cardBounds) => {
        let { clickedCardCode, isMyTurn, tryMyCardClick, tryUseCard, isPending } = this.props;

        // second click on a card, that means a player wants to use it
        if (code === clickedCardCode) {
            if (isMyTurn) {
                return tryUseCard(code, cardBounds);
            } else {
                // mb show something to a player?
            }
        }

        return tryMyCardClick(code);
    };

    render() {
        let {
            me,
            leftPlayer,
            topPlayers,
            rightPlayer,
            clickedCardCode,
            playingCard,
            dealAreaBounds,
        } = this.props;

        return (
            <div className="game-table">
                <TopArea
                    topPlayers={topPlayers}/>

                <MiddleArea
                    setDealAreaBounds={this.setDealAreaBounds}
                    rightPlayer={rightPlayer}
                    leftPlayer={leftPlayer}
                    />

                <LowArea
                    me={me}
                    dealAreaBounds={dealAreaBounds}
                    clickedCardCode={clickedCardCode}
                    playingCard={playingCard}
                    onMyCardClick={this.onMyCardClickHandle}
                />
            </div>
        )
    }
}
