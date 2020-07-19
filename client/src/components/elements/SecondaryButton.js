import React from "react";
import { Button } from "react-bootstrap";

export default class SecondaryButton extends React.PureComponent {
    render() {
        let { text, onClick } = this.props;

        return(
            <Button variant="info" onClick={onClick}>{text}</Button>
        )
    }
}
