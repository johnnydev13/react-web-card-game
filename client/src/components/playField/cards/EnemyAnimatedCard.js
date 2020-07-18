import React from 'react';
import { throwFromNowhereStyles } from '../../../animation';
import Card from './Card';

export default class EnemyAnimatedCard extends React.PureComponent {
    getCardStyle = (dealAreaBounds, playerBounds, throwType) => {
        let top = dealAreaBounds.top;
        let left = dealAreaBounds.width / 2 + dealAreaBounds.left;

        return throwFromNowhereStyles(playerBounds.left, playerBounds.top, left, top, throwType);
    };

    render() {
        let { playingCard, dealAreaBounds, playerBounds, throwType } = this.props;

        if (!playerBounds) {
            return false;
        }

        let cardStyle = this.getCardStyle(dealAreaBounds, playerBounds, throwType);

        return (
            <Card
                card={playingCard}
                className={'animated-card'}
                cardStyle={cardStyle}
            />
        )
    }
}


