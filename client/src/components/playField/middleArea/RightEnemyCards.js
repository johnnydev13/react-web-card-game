import React from 'react';
import Card from "./Card";

export default class RightEnemyCards extends React.PureComponent {
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
            <div className="right-enemy-cards">
                <div className='card-container'>
                    {this.renderCards()}
                </div>
            </div>
        );
    }
}
