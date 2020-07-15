import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
    render () {
        return (
            <span>
                Game
            </span>
        );
    }
}

export default connect(null, null)(Game);
