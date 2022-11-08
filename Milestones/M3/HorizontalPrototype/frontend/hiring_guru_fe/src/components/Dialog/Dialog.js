import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import React from "react";

export function Dialog(props) {
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {props.children && props.children}
                {props.body && props.body}
            </Modal.Body>

            <Modal.Footer>
                {
                    props.actions.map((action) => {
                        return (
                            <Button
                                key={`dialog-action-${action.title}`}
                                variant={action.variant}
                                onClick={action.handler}
                            >
                                {action.title}
                            </Button>
                        )
                    })
                }
            </Modal.Footer>
        </Modal>
    )
}