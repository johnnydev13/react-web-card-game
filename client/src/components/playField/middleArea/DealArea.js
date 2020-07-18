import React from 'react';
import Card from "../cards/Card";
import {getEndStyles, getPositionOffsetByType, getRandomOutsidePosition, throwToNowhereStyles} from '../../../animation';
import { cardThrow as cardThrowConfig } from '../../../config/animation';

export default class DealArea extends React.PureComponent {
    state = {
        bounds: false,
        windowWidth: 0,
        windowHeight: 0,
    };

    componentDidMount() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        });
    }

    getClearingStyles = (fromLeft, fromTop, throwType, toLeft, toTop) => {
        let { left, top } = getPositionOffsetByType(fromLeft, fromTop, throwType);

        return throwToNowhereStyles(left, top, toLeft, toTop, throwType);
    };

    renderDealCard = () => {
        let { dealCards, isClearingDealArea, playersCount } = this.props;

        if (dealCards.length === 0 || !this.state.bounds) {
            return false;
        }

        let { bounds } = this.state;

        /*
        * this is not supposed to be here
        * TODO replace to another place
        */
        let left = bounds.width / 2 + bounds.left;
        let cards = [];

        for(let i = 0; i < dealCards.length; i++) {
            let card = dealCards[i];

            let throwTypeKey = Object.keys(cardThrowConfig.types)[i];
            //let throwType    = cardThrowConfig.types[throwTypeKey];


            /*
             * the point is to make fixed animation types depending on players count
             * whis is not supposed to be here
             *
             * TODO: make it not here!!
             */
            let throwType;

            if (i === 0) {
                throwType = cardThrowConfig.types.first;
            } else {
                switch (playersCount) {
                    case 2:
                        throwType = cardThrowConfig.types.third;
                        break;
                    case 3:
                        throwType = i === 1 ? cardThrowConfig.types.second : cardThrowConfig.types.fifth;
                        break;
                    case 4:
                        throwType = i === 1 ? cardThrowConfig.types.second : (i === 2 ? cardThrowConfig.types.third : cardThrowConfig.types.fifth);
                        break;
                    case 5:
                        throwType = cardThrowConfig.types[throwTypeKey];
                        break;
                    default:
                        throwType = cardThrowConfig.types.first;
                        break;
                }
            }


            console.log('throwType', throwType);
            let styles;

            if (isClearingDealArea) {
                let {toLeft, toTop} = getRandomOutsidePosition(this.state.windowWidth, this.state.windowHeight);
                styles = this.getClearingStyles(left, bounds.top, throwType, toLeft, toTop);
            } else {
                styles = getEndStyles(left, bounds.top, throwType)
            }

            cards.push(<Card
                key={i}
                card={card}
                className={'deal-card'}
                cardStyle={styles}
            />);
        }

        return cards;
    };

    render() {
        let { playersRendered, setDealAreaBounds } = this.props;
        return (
            <div ref={(el) => {
                if (!el || !playersRendered) {
                    return false;
                }

                if (!this.state.bounds) {
                    this.setState({bounds: el.getBoundingClientRect()})
                    setDealAreaBounds(el.getBoundingClientRect());
                }

            }} className="deal-area">
                {this.renderDealCard()}
            </div>
        );
    }
}
