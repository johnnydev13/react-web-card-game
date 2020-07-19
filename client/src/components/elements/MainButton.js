import React from "react";
import { Button } from "react-bootstrap";

export default class MainButton extends React.PureComponent {
    render() {
        let { text, onClick } = this.props;

        return(
            <Button variant="primary"  onClick={onClick}>{text}</Button>
        )
    }
}
