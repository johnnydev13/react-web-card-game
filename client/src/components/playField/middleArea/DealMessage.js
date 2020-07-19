import React from 'react';
import InfoMessage from '../../elements/InfoMessage';

export default class DealMessage extends React.PureComponent {
    renderMessage = (dealMessage) => {
        if (dealMessage.text === '') {
            return false;
        }

        // TODO: make it disappear animated
        /*let styles = {
            opacity: dealMessage.isDisapper ? 0 : 1,
        };*/
        return (
            <InfoMessage text={dealMessage.title + ': ' + dealMessage.text}/>
        )
    };
    render() {
        let { dealMessage } = this.props;
        return (
            <div className={'game-message'}>
                {this.renderMessage(dealMessage)}
            </div>
        );
    }
}
