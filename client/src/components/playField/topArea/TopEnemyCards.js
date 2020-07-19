import React from 'react';
import BackCard from "../cards/BackCard";
import EnemyAnimatedCard from '../cards/EnemyAnimatedCard';

export default class TopEnemyCards extends React.PureComponent {
    state = {
        bounds: false
    };
    renderCards = (player) => {
        let cards = [];

        for(let i = 0; i < player.cards; i++) {
            cards.push(<BackCard key={i}/>);
        }

        return cards;
    };

    renderAnimatedCard = (playingCard, destAreaBounds) => {
        if (!playingCard) {
            return false;
        }

        let { player } = this.props;

        let throwType = player ? player.num : 0;//this.props.index === 0 ? cardThrowConfig.types.third : cardThrowConfig.types.fourth;

        return <EnemyAnimatedCard
            playingCard={playingCard}
            dealAreaBounds={destAreaBounds}
            playerBounds={this.state.bounds}
            throwType={throwType}
        />
    };

    render() {
        let { player, dealAreaBounds } = this.props;
        return (
            <div className="top-enemy-cards">
                <div
                    ref={(el) => {
                        if (!el || !player || this.state.bounds) {
                            return false;
                        }

                        this.setState({bounds: el.getBoundingClientRect()})
                        //setPlayerBounds(el.getBoundingClientRect())
                    }}
                    className='card-container'>
                    {this.renderCards(player)}
                    {this.renderAnimatedCard(player.playingCard, dealAreaBounds)}
                </div>
            </div>
        );
    }
}
