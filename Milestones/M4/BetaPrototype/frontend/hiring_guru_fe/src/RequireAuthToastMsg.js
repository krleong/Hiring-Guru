import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function RequireAuthToastMsg() {
    const [position, setPosition] = useState('middle-center');

    return (
        <div
            style={{ minHeight: '240px', margin: 'auto' }}
        >
            <ToastContainer className="p-3" position={position}>
                <Toast>
                    <Toast.Header closeButton={false}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Hirng Guru</strong>
                        <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>You must be logged in.</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}

export default RequireAuthToastMsg;