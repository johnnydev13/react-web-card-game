import React from 'react';
import Card from "./Card";

export default class LeftEnemyCards extends React.PureComponent {
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
            <div className="left-enemy-cards">
                <div className='card-container'>
                    {this.renderCards()}
                </div>
            </div>
        );
    }
}
