import React from 'react';
import { Alert } from 'react-bootstrap';

export default class SuccessMessage extends React.PureComponent {
    render () {
        return (
            <Alert variant='primary'>
                {this.props.text}
            </Alert>
        )
    }
}
