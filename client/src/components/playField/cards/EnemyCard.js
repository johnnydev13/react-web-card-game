import React from 'react';
import {cardOnInit} from "../../../config/animation";

export default class EnemyCard extends React.PureComponent {
    state =  {
        isInit: true,
    };

    componentDidMount() {
        if (this.state.isInit) {
            this.setState({isInit: false});
        }
    }

    render() {
        let cardStyle = this.state.isInit ? {marginLeft: cardOnInit.margin + 'px'} : {};

        return (
            <div style={cardStyle} className={this.props.className}></div>
        );
    }
}

