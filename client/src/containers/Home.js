import React from 'react';
import { connect } from 'react-redux';
import { addHumanPlayer, addBotPlayer, startGame } from '../actions/game';

class Home extends React.Component {
    startGame = () => {

        this.props.startGame('Player', 5);
    };
    componentDidMount() {

    }
    render () {
        return (
            <div>
                <div onClick={this.startGame}>
                    Start a game
                </div>
            </div>
        );
    }
}

/*const mapStateToProps = state => ({
    filteredTodos: getVisibleTodos(state)
});*/
/*const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
});*/

export default connect(null, {
    startGame,
    addHumanPlayer,
    addBotPlayer
})(Home);
