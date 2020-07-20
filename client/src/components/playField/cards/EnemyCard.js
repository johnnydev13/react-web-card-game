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
        let { floatDirecton } = this.props;
        let floatStyles = floatDirecton === 'side' ? {marginTop: cardOnInit.margin + 'px'} : {marginLeft: cardOnInit.margin + 'px'};
        let cardStyle = this.state.isInit ? floatStyles : {};

        return (
            <div style={{...cardStyle, transition: cardOnInit.speed + 's'}} className={this.props.className}></div>
        );
    }
}

