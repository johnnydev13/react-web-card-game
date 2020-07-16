import React from 'react';
import { connect } from 'react-redux';

class PlayField extends React.PureComponent {
    render() {
        return (
            <div>PlayField</div>
        )
    }
}

const mapStateToProps = state => ({
    roomId:       state.game.roomId,
    players:      state.game.players,
});

export default connect(mapStateToProps, {

})(PlayField);
