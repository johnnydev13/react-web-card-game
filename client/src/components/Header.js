import React from "react";
import { Toast } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent {
    renderError = () => {
        let { globalError } = this.props;

        if (!globalError) {
            return false;
        }

        return (
            <Toast>
                <Toast.Header onClick={this.props.hideGlobalError}>
                    <strong className="mr-auto">An error has occurred</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>
                    {globalError}<br/>
                    <Link to={'/'}>return to the main page</Link>
                </Toast.Body>
            </Toast>
        )
    };

    render() {
        return (
            <div className={'header'}>
                <div className={'errors'}>
                {this.renderError()}
                </div>
            </div>
        )
    }
}
