import React from 'react';
import Card from './Card';

export default class MyCards extends React.PureComponent {
    renderCards = () => {
        let {cards, onMyCardClick, clickedCardCode, playingCard, dealAreaBounds} = this.props;

        return cards.map((card, index) => {
            return <Card
                key={index}
                card={card}
                dealAreaBounds={dealAreaBounds}
                onCardClick={onMyCardClick}
                isClicked={clickedCardCode === card.code}
                playingCard={playingCard}
            />
        });
    };

    render() {

        return (
            <div className="my-cards">
                {this.renderCards()}
            </div>
        );
    }
}
