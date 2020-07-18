import React from 'react';
import MyCards from './lowArea/MyCards';

export default class LowArea extends React.PureComponent {
    render() {
        let { me, onMyCardClick, clickedCardCode, playingCard, dealAreaBounds } = this.props;
        let cards = typeof me === 'undefined' ? [] : me.cards;
        return (
            <div className="low-area">
                <MyCards
                    cards={cards}
                    dealAreaBounds={dealAreaBounds}
                    onMyCardClick={onMyCardClick}
                    playingCard={playingCard}
                    clickedCardCode={clickedCardCode}
                />
            </div>
        );
    }
}
