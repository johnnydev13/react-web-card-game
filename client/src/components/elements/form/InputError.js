import React from 'react';
import { Alert } from 'react-bootstrap';

export default class InputError extends React.PureComponent {
    render () {
        return (
            <Alert variant='danger'>
                {this.props.errorText}
            </Alert>
        )
    }
}
