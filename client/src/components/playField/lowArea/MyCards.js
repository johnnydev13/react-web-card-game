import React from 'react';
import PlayerCard from '../cards/PlayerCard';

export default class MyCards extends React.PureComponent {
    renderCards = () => {
        let {cards, onMyCardClick, clickedCardCode, playingCard, dealAreaBounds, throwType} = this.props;

        return cards.map((card, index) => {
            return <PlayerCard
                key={index}
                card={card}
                throwType={throwType}
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
