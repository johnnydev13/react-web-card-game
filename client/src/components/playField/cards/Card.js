import React from 'react';
import Radium from 'radium';
import { cardOnInit } from '../../../config/animation'

class Card extends React.PureComponent {

    render() {
        let { className, cardStyle, onCardClick, card, onRender } = this.props;

        return (
            <img
                ref={onRender}

                style={{...cardStyle, transition: cardOnInit.speed + 's'}}
                className={className}
                onClick={onCardClick}

                src={card.image}
                alt={card.code}
            />
        );
    }
}

export default Radium(Card);
