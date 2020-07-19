import { connect } from 'react-redux';
import { getGameDataRequest } from '../actions/game';
import { getMe, getTopPlayers, getLeftPlayer, getRightPlayer, isMyTurn } from '../selectors/game';
import PlayField from '../components/PlayField';
import store from '../store';
import cards from '../reducers/cards';
import { tryMyCardClick, tryUseCard, saveDealAreaBounds, savePlayerAreaBounds } from '../actions/cards';
import { pendingStart, pendingStop } from '../actions/game';
import { getClickedCardCode, getPlayingCard, getDealAreaBounds, getPlayersAreasBounds, getIsClearingDealingArea } from '../selectors/cards';

store.reducerManager.add("cards", cards);

//console.log(store.reducerManager);
const mapStateToProps = state => ({
    roomId:       state.game.roomId,
    login:        state.user.login,
    isPending:    state.game.isPending,
    dealCards:    state.game.dealCards,
    playersCount: state.game.players.length,
    dealMessage:  state.ui.dealMessage,

    isClearingDealArea: getIsClearingDealingArea(state),
    dealAreaBounds:     getDealAreaBounds(state),
    clickedCardCode:    getClickedCardCode(state),
    playingCard:        getPlayingCard(state),
    playersAreasBounds: getPlayersAreasBounds(state),

    isMyTurn:        isMyTurn(state),
    me:              getMe(state),
    topPlayers:      getTopPlayers(state),
    leftPlayer:      getLeftPlayer(state),
    rightPlayer:     getRightPlayer(state),
});

export default connect(mapStateToProps, {
    pendingStart,
    pendingStop,
    getGameDataRequest,
    tryUseCard,
    saveDealAreaBounds,
    savePlayerAreaBounds,
    tryMyCardClick
})(PlayField);
