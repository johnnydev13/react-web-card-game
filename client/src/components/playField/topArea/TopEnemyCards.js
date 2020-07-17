import React from 'react';
import Card from "./Card";

export default class TopEnemyCards extends React.PureComponent {
    renderCards = () => {
        let { player } = this.props;

        let cards = [];

        for(let i = 0; i < player.cards; i++) {
            cards.push(<Card key={i}/>);
        }

        return cards;
    };

    render() {
        return (
            <div className="top-enemy-cards">
                <div className='card-container'>
                    {this.renderCards()}
                </div>
            </div>
        );
    }
}
