import React from "react";
import { Toast as ToastElem } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Toast extends React.PureComponent {
    render() {
        let { onClick, title, text } = this.props;

        return (
            <ToastElem>
                <ToastElem.Header onClick={onClick}>
                    <strong className="mr-auto">{title}</strong>
                    <small>just now</small>
                </ToastElem.Header>
                <ToastElem.Body>
                    {text}<br/>
                    <Link to={'/'}>return to the main page</Link>
                </ToastElem.Body>
            </ToastElem>
        );
    }
}
