import React from "react";
import { Modal as ModalElem } from "react-bootstrap";
import SecondaryButton from '../elements/SecondaryButton';

export default class Modal extends React.PureComponent {
    render() {
        let { onClose, title, text } = this.props;

        return (
            <ModalElem.Dialog className={'main-modal'}>
                <ModalElem.Header closeButton onClick={onClose}>
                    <ModalElem.Title>{title}</ModalElem.Title>
                </ModalElem.Header>

                <ModalElem.Body>
                    <p>{text}</p>
                </ModalElem.Body>

                <ModalElem.Footer>
                    <SecondaryButton text={'Close'} onClick={onClose}/>
                </ModalElem.Footer>
            </ModalElem.Dialog>
        );
    }
}
