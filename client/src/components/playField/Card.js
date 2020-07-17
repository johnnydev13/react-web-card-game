import React from 'react';
import Radium from 'radium';
import { pulseAnimation, moveThrowStyles, moveThrow } from '../../animation';

class Card extends React.PureComponent {
    state = {
        cardBounds: {
            width: 0,
            height: 0,
            top: 0,
            left: 0,
        }
    };
    getCardStyle = (isClicked, isPlaying, dealAreaBounds, cardBounds) => {
        if (isPlaying) {
            let top = dealAreaBounds.top;
            let left = (dealAreaBounds.width + dealAreaBounds.left) / 2;

            return moveThrowStyles(cardBounds.left, cardBounds.top, left, top);
            return {
                ...moveThrow(cardBounds.left, cardBounds.top, left, top),
                position: 'absolute',
                left: left + 'px',
                top: top + 'px',
            };
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
                <img
                    ref={(el) => {
                        //console.log(el)
                    }}
                    alt={card.code}
                    style={cardStyle}
                    className={'my-card ' + (isClicked ? 'clicked' : '')}
                    src={card.image}
                    onClick={(e) => {
                        let {width, height, top, left} = e.target.getBoundingClientRect();
                        onCardClick(card.code, {width, height, top, left})
                    }}
                />
        );
    }
}

export default Radium(Card);
