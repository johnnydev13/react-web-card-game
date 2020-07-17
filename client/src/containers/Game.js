import { connect } from 'react-redux';
import { connectToGameRequest } from '../actions/game';
import Game from '../components/Game';

const mapStateToProps = state => ({
    roomId:       state.game.roomId,
    gameStarted:  state.game.isStarted,
    errorMessage: state.game.errorMessage,
    players:      state.game.players,
    login:        state.user.login,
    name:         state.user.name,
});

export default connect(mapStateToProps, {
    connectToGameRequest
})(Game);
