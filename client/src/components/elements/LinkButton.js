import React from "react";
import { Button } from "react-bootstrap";

export default class LinkButton extends React.PureComponent {
    render() {
        let { text, onClick } = this.props;

        return(
            <Button variant="link" onClick={onClick}>{text}</Button>
        )
    }
}
