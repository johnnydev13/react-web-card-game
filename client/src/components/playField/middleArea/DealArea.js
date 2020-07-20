import React from 'react';
import Card from "../cards/Card";
import {getEndStyles, getPositionOffsetByType, getRandomOutsidePosition, throwToNowhereStyles} from '../../../animation';
import DealMessage from './DealMessage';

//const getThrowTypeBy
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

        //window.addEventListener('resize', this.updateBounds);
    }

    updateBounds = (el) => {
        let { playersRendered, setDealAreaBounds } = this.props;

        if (!el || !playersRendered) {
            return false;
        }

        if (!this.state.bounds) {
            let bounds = el.getBoundingClientRect();
            this.setState({bounds: bounds});
            setDealAreaBounds(bounds);
        }
    };

    getClearingStyles = (fromLeft, fromTop, throwType, toLeft, toTop) => {
        let { left, top } = getPositionOffsetByType(fromLeft, fromTop, throwType);

        return throwToNowhereStyles(left, top, toLeft, toTop, throwType);
    };

    renderDealCard = () => {
        let { dealCards, isClearingDealArea } = this.props;

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

            let throwType = card.playerNum;
            //let throwType = getThrowTypeByPlayersCount(i, playersCount);

            let styles;

            if (isClearingDealArea) {
                let {toLeft, toTop} = getRandomOutsidePosition(this.state.windowWidth, this.state.windowHeight);
                styles = this.getClearingStyles(left, 0, throwType, toLeft, toTop);
            } else {
                styles = getEndStyles(left, 0, throwType)
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
        let { dealMessage } = this.props;
        return (
            <div className="deal-area"
                 ref={(el) => {
                     this.updateBounds(el)
                 }}>

                <DealMessage dealMessage={dealMessage}/>

                <div
                    className='deal-cards'
                    >
                    {this.renderDealCard()}
                </div>
            </div>

        );
    }
}
