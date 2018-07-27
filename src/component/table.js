import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class Trigger extends React.Component {
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
      const props = this.props;
      console.log(props)
      return (
          <div>
        <Button
        bsStyle="primary"
        bsSize="small"
        onClick={() => this.setState({ show: true })}
      >
        detail
      </Button>
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
                <div>ID :{this.props.list.title}</div>
                <div>Description:{this.props.list.title}</div>
                <div>Date:{this.props.list.date}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
        </div>
      );
    }
  }
  
export default Trigger;