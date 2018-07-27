import React from 'react';
import { Button, Modal, ListGroup, ListGroupItem, Col } from 'react-bootstrap';
import detail from './img/detail.png';
import './component.css';

class DetailTask extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false
        };

    }

    handleHide() {
        this.setState({ show: false });
    }

    render() {
        return (<div>
            {/* <div> <img src={detail} className="size-check-box" onClick={() => this.setState({ show: true })} /></div> */}
            <div>
                <div className="modal-container">
                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                {this.props.list.title}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>ID :{this.props.list.id}</div>
                            <div>Description:{this.props.list.text}</div>
                            <div>Date:{this.props.list.date}</div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
        );
    }


}

export default DetailTask;