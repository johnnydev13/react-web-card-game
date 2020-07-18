import React from 'react';
import Radium from 'radium';

class Card extends React.PureComponent {

    render() {
        let { className, cardStyle, onCardClick, card, onRender } = this.props;

        return (
            <img
                ref={onRender}

                style={cardStyle}
                className={className}
                onClick={onCardClick}

                src={card.image}
                alt={card.code}
            />
        );
    }
}

export default Radium(Card);
