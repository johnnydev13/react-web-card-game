import React from 'react';
import { pulseAnimation, moveThrowStyles, getAreaThrowPoint } from '../../../animation';
import { cardThrow as cardThrowConfig } from '../../../config/animation';
import Card from './Card';

export default class PlayerCard extends React.PureComponent {
    getCardStyle = (isClicked, isPlaying, dealAreaBounds, cardBounds) => {
        if (isPlaying) {
            let throwType = cardThrowConfig.types.first;
            let { left, top } = getAreaThrowPoint(dealAreaBounds, throwType);

            console.log('Playing throwType', throwType);
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
