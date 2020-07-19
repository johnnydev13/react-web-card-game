import React from 'react';
import { pulseAnimation, moveThrowStyles, getAreaThrowPoint } from '../../../animation';
import Card from './Card';
import { cardOnInit } from '../../../config/animation';

export default class PlayerCard extends React.PureComponent {
    state =  {
        isInit: true,
    };

    componentDidMount() {
        if (this.state.isInit) {
            this.setState({isInit: false});
        }
    }

    getCardStyle = (isClicked, isPlaying, dealAreaBounds, cardBounds) => {
        if (isPlaying) {
            let throwType = this.props.throwType;
            let { left, top } = getAreaThrowPoint(dealAreaBounds, throwType);

            return moveThrowStyles(cardBounds.left, cardBounds.top, left, top, throwType);
        }

        if (isClicked) {
             return pulseAnimation();
        }

        return {};
    };

    render() {
        let { card, onCardClick, isClicked, playingCard, dealAreaBounds} = this.props;

        let isPlaying = playingCard.code === card.code;
        let cardStyle = this.getCardStyle(isClicked, isPlaying, dealAreaBounds, playingCard.bounds);

        if (this.state.isInit) {
            cardStyle = {...cardStyle, marginLeft: cardOnInit.margin + 'px'};
        }

        return (
            <Card
                card={card}
                className={'my-card ' + (isClicked ? 'clicked' : '')}
                onCardClick={(e) => {
                    let {width, height, top, left} = e.target.getBoundingClientRect();
                    onCardClick(card.code, {width, height, top, left})
                }}
                cardStyle={cardStyle}
                />
        );
    }
}
