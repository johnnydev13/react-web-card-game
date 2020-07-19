import React from 'react';
import { Alert } from 'react-bootstrap';

export default class InfoMessage extends React.PureComponent {
    render () {
        return (
            <Alert variant='light'>
                {this.props.text}
            </Alert>
        )
    }
}
