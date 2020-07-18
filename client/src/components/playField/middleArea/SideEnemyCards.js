import React from 'react';
import SideCard from "../cards/SideCard";
import {cardThrow as cardThrowConfig} from "../../../config/animation";
import EnemyAnimatedCard from '../cards/EnemyAnimatedCard';

export default class SideEnemyCards extends React.PureComponent {
    state = {
        bounds: false,
    };

    renderCards = (player) => {
        let cards = [];

        for(let i = 0; i < player.cards; i++) {
            cards.push(<SideCard key={i}/>);
        }

        return cards;
    };

    renderAnimatedCard = (playingCard, destAreaBounds, throwType) => {
        if (!playingCard) {
            return false;
        }

        //let throwType = this.props.index === 0 ? cardThrowConfig.types.third : cardThrowConfig.types.fourth;

        return <EnemyAnimatedCard
            playingCard={playingCard}
            dealAreaBounds={destAreaBounds}
            playerBounds={this.state.bounds}
            throwType={throwType}
        />
    };

    render() {
        let { setPlayerBounds, player, dealAreaBounds, containerClass, throwType } = this.props;
        return (
            <div className={containerClass}>
                <div
                    ref={(el) => {
                        if (!el || !player) {
                            return false;
                        }

                        if (!this.state.bounds) {
                            let bounds =  el.getBoundingClientRect();
                            this.setState({bounds: bounds});
                            setPlayerBounds(player.id, bounds);
                        }

                    }}
                    className='card-container'>
                    {this.renderCards(player)}
                    {this.renderAnimatedCard(player.playingCard, dealAreaBounds, throwType)}
                </div>
            </div>
        );
    }
}
