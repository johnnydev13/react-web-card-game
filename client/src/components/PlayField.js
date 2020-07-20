import React from "react";
import './playField/styles';
import LowArea from './playField/LowArea';
import TopArea from './playField/TopArea';
import MiddleArea from './playField/MiddleArea';
import PropTypes from 'prop-types';

export default class PlayField extends React.PureComponent {
    componentDidMount() {
        if (!this.props.roomId) {
            // page refreshed, need to get game data from a server
            this.props.getGameDataRequest(this.props.match.params.roomId, this.props.login)
        }
    }

    setDealAreaBounds = (bounds) => {
        this.props.saveDealAreaBounds(bounds.width, bounds.height, bounds.left, bounds.top);
    };
    setPlayerBounds = (playerId, bounds) => {
        //this.props.savePlayerAreaBounds(playerId, bounds.width, bounds.height, bounds.left, bounds.top);
    };

    onMyCardClickHandle = (code, cardBounds) => {
        let { clickedCardCode, isMyTurn, tryMyCardClick, tryUseCard } = this.props;

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

    getPlayerBounds = (player) => {
       /* if (!player) {
            return false;
        }

        return typeof this.props.playersAreasBounds[player.id] === 'undefined' ? false : this.props.playersAreasBounds[player.id];*/
    };
    getTopPlayersBounds = (players) => {
        if (!players) {
            return false;
        }

        let bounds = [];
        players.forEach(player => {
            bounds.push(this.getPlayerBounds(player));
        });
        return bounds;
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
            dealCards,
            isClearingDealArea,
            playersCount,
            dealMessage,
        } = this.props;

        return (
            <div className="game-table">
                <TopArea
                    playersBounds={this.getTopPlayersBounds(topPlayers)}
                    topPlayers={topPlayers}
                    setPlayerBounds={this.setPlayerBounds}
                    dealAreaBounds={dealAreaBounds}
                />

                <MiddleArea
                    dealMessage={dealMessage}
                    playersCount={playersCount}
                    isClearingDealArea={isClearingDealArea}
                    setDealAreaBounds={this.setDealAreaBounds}
                    dealAreaBounds={dealAreaBounds}
                    rightPlayer={rightPlayer}
                    rightPlayerBounds={this.getPlayerBounds(rightPlayer)}
                    leftPlayer={leftPlayer}
                    leftPlayerBounds={this.getPlayerBounds(leftPlayer)}
                    dealCards={dealCards}
                    playersRendered={leftPlayer || topPlayers.length > 0}
                    setPlayerBounds={this.setPlayerBounds}
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

let cardShape = PropTypes.shape({
    image: PropTypes.string,
    code: PropTypes.string,
});
let boundsShape = PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
});
let playerData = {
    login: PropTypes.string,
    name: PropTypes.string,
};
let playerShape = PropTypes.shape({
    ...playerData,
    cards: PropTypes.oneOfType([PropTypes.number, cardShape])
});
PlayField.propTypes = {
    roomId: PropTypes.string,
    login: PropTypes.string,
    isPending: PropTypes.bool,
    playersCount: PropTypes.number,
    dealCards: PropTypes.arrayOf(cardShape),

    dealMessage: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        isDisapper: PropTypes.bool,
    }),
    isClearingDealArea: PropTypes.bool,
    dealAreaBounds: PropTypes.object,
    clickedCardCode:PropTypes.string,
    playingCard: PropTypes.shape({
        image: PropTypes.string,
        code: PropTypes.string,
    }),
    playersAreasBounds: PropTypes.objectOf(boundsShape),

    isMyTurn: PropTypes.bool,
    me: PropTypes.shape(playerData),
    topPlayers: PropTypes.arrayOf(playerShape),
    leftPlayer: PropTypes.oneOfType([
        playerShape,
        PropTypes.bool,
    ]),
    rightPlayer: PropTypes.oneOfType([
        playerShape,
        PropTypes.bool,
    ]),
};
