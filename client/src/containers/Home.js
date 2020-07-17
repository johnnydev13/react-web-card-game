import { connect } from 'react-redux';
import { addBotPlayer, startGameRequest, findGamesRequest } from '../actions/game';
import Home from '../components/Home';

const mapStateToProps = state => ({
    availableGames: state.game.availableGames,
    roomId:         state.game.roomId,
    login:          state.user.login,
    name:           state.user.name,
});
/*const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
});*/

export default connect(mapStateToProps, {
    findGamesRequest,
    startGameRequest,
    addBotPlayer
})(Home);
