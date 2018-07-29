import React from 'react';
import { Button, Col, FormGroup, FormControl } from 'react-bootstrap';
import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import success from './img/blank-check-box.png';
import checkbox from './img/check-box.png';
import clear from './img/delete.png';
import add from './img/add.png';
import './component.css';

class InputTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            task: '',
            titleupdate: '',
            taskupdate: '',
            idupdate:'',
            dateupdate:'',
            list: [],
            done: [],
            update: [],
            show: false,
            edit: false,
            keyCount:-1
        };
        this.handleHide = this.handleHide.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getKey = this.getKey.bind(this);

        var todo = localStorage.getItem('todo');
        var done = localStorage.getItem('done');

        if (null !== done && done !== [] && done !== '' && JSON.parse(done).length !== 0) {
            this.state.done = JSON.parse(done)
            let len = this.state.done.length
            for(let i=0;i<len;i++){
                if(i===0){
                    this.state.keyCount = this.state.done[i].id;
                }
                else{
                    if(this.state.keyCount < this.state.done[i].id){
                        this.state.keyCount = this.state.done[i].id;
                    }
                }
            }
        }

        if (null !== todo && todo !== [] && todo !== '' && JSON.parse(todo).length !== 0) {
            this.state.list = JSON.parse(todo)
            let len = this.state.list.length
            for(let i=0;i<len;i++){
                if(i===0){
                    if(this.state.list === []){
                        this.state.keyCount = this.state.list[i].id;
                    }else{
                        if(this.state.keyCount < this.state.list[i].id){
                            this.state.keyCount = this.state.list[i].id;
                        } 
                    }
                }
                else{
                    if(this.state.keyCount < this.state.list[i].id){
                        this.state.keyCount = this.state.list[i].id;
                    }
                }
            }           

        }
        this.state.keyCount++;                  
    }

    getKey() {
        this.setState({ keyCount : this.state.keyCount+1 });
        return this.state.keyCount;
    }

    render() {
        return (
            <div>
                <Col xs={12} md={12}>
                    <h2> ADD Task </h2>
                    <h5> Add Title and Discription task to the list </h5>
                    <hr></hr>
                    <Col xs={12} md={8} mdOffset={2} >
                        <form>
                            <FormGroup controlId="formBasicText" >

                                <FormControl
                                    type="text"
                                    value={this.state.title}
                                    placeholder="Title"
                                    onChange={this.onTitleChange}
                                    maxLength={10}
                                    onKeyPress={this.handleKey}
                                    title={this.state.title}
                                    required
                                />
                                <FormControl.Feedback />

                            </FormGroup>
                        </form>
                    </Col>
                    <Col xs={12} md={8} mdOffset={2} >
                        <form>
                            <FormGroup controlId="formBasicText" >

                                <FormControl
                                    type="textArea"
                                    value={this.state.task}
                                    placeholder="Description"
                                    onChange={this.onTaskChange}
                                    maxLength={80}
                                    onKeyPress={this.handleKey}
                                    componentClass="textarea"
                                    task={this.state.task}
                                    required
                                />
                                <FormControl.Feedback />

                            </FormGroup>
                        </form>
                    </Col>
                    <Col xs={12} md={2} className="paddingTop10">
                        <img src={add} alt="Add Task"  className="check-box cursor" onClick={this.handleClick} />
                    </Col>
                    <Col xs={12} md={12}>
                        <div className="display-list">
                            <h2> TODO Task </h2>
                            <h5>{this.state.list.length} Task</h5>
                            <h6> Click title task to more details and update details.</h6>
                            <Col xs={12} md={8} mdOffset={2} >

                                <ListGroup>
                                    {this.state.list.map((list, index) => (
                                        <ListGroupItem key={index} bsStyle="info" className="row">
                                            <Col xs={1} md={1} className="check-box cursor">
                                                <img src={success} alt="Check to Done" className="size-check-box" onClick={() => this.endTask(list.id)} />
                                            </Col>
                                            <Col xs={9} md={10} className="font-size-20 cursor" onClick={() => this.setState({ show: true ,titleupdate:list.title,taskupdate:list.text,idupdate:list.id,dateupdate:list.date })} >{list.title}</Col>

                                            <img src={clear} alt="Click to Remove" className="clear" onClick={() => this.removeTask(list.id)} />
                                            <div className="modal-container">
                                                <Modal
                                                    show={this.state.show}
                                                    onHide={this.handleHide}
                                                    container={this}
                                                    aria-labelledby="contained-modal-title"
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="contained-modal-title">
                                                            Detail Task
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body className="row">
                                                        <Col xs={12} md={12}>
                                                            <Col xs={2} md={2} mdOffset={1} xsOffset={1} className="title-deails">
                                                                ID : 
                                                            </Col>
                                                            <Col xs={8} md={8} >
                                                                <form>
                                                                    <FormGroup controlId="formBasicText" >

                                                                        <FormControl
                                                                            type="text"
                                                                            value={this.state.idupdate}
                                                                            disabled
                                                                        />
                                                                        <FormControl.Feedback />

                                                                    </FormGroup>
                                                                </form>
                                                            </Col>
                                                        </Col>
                                                        <Col xs={12} md={12}>
                                                            <Col xs={2} md={2} mdOffset={1} xsOffset={1} className="title-deails">
                                                                Date : 
                                                            </Col>
                                                            <Col xs={8} md={8} >
                                                                <form>
                                                                    <FormGroup controlId="formBasicText" >

                                                                        <FormControl
                                                                            type="text"
                                                                            value={this.state.dateupdate}
                                                                            disabled
                                                                        />
                                                                        <FormControl.Feedback />

                                                                    </FormGroup>
                                                                </form>
                                                            </Col>
                                                        </Col>
                                                        <Col xs={12} md={12}>
                                                            <Col xs={2} md={2} mdOffset={1} xsOffset={1} className="title-deails">
                                                            Title : 
                                                            </Col>
                                                            <Col xs={8} md={8}>
                                                                <form>
                                                                    <FormGroup controlId="formBasicText" >

                                                                        <FormControl
                                                                            type="text"
                                                                            value={this.state.titleupdate}
                                                                            placeholder="Title"
                                                                            onChange={this.onTitleUpdate}
                                                                            maxLength={10}
                                                                            onKeyPress={this.handleKey}
                                                                            titleupdate={this.state.titleupdate}
                                                                            required
                                                                        />
                                                                        <FormControl.Feedback />

                                                                    </FormGroup>
                                                                </form>
                                                            </Col>
                                                        </Col>
                                                        <Col xs={12} md={12}>
                                                            <Col xs={2} md={2} mdOffset={1} xsOffset={1} className="title-deails">
                                                            Description : 
                                                            </Col>
                                                            <Col xs={8} md={8} >
                                                                <form>
                                                                    <FormGroup controlId="formBasicText" >

                                                                        <FormControl
                                                                            type="textArea"
                                                                            value={this.state.taskupdate}
                                                                            placeholder="Description"
                                                                            onChange={this.onTaskUpdate}
                                                                            maxLength={80}
                                                                            onKeyPress={this.handleKey}
                                                                            componentClass="textarea"
                                                                            taskupdate={this.state.taskupdate}
                                                                            required
                                                                        />
                                                                        <FormControl.Feedback />

                                                                    </FormGroup>
                                                                </form>
                                                            </Col>
                                                        </Col>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        {/* <Button onClick={this.handleSave} edit={this.state.edit}>Save</Button> */}
                                                        <Button onClick={() => this.handleUpdate()} >Update</Button>
                                                        <Button onClick={this.handleHide}>Close</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col xs={12} md={8} mdOffset={2} >
                                <h2> Task Done </h2>
                                <h5>{this.state.done.length} Task</h5>

                                <ListGroup >
                                    {this.state.done.map((done, index) => (
                                        <ListGroupItem bsStyle="success" key={index} className="row">

                                            <Col xs={1} md={1} className="check-box">
                                                <img src={checkbox} alt="Click to Do List"  className="size-check-box cursor"  onClick={() => this.undoTask(done.id)}/></Col>
                                            <Col xs={9} md={10} className="font-size-20" >{done.title}</Col>
                                            <img src={clear} alt="Click to Remove"  className="clear" onClick={() => this.clearTask(done.id)} />

                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </Col>
                        </div>

                    </Col>
                </Col>
            </div>
        );
    }
    showText() {
        return <p>Click to more detail</p>
    }

    handleHide() {
        this.setState({ show: false ,titleupdate:'',taskupdate:'',idupdate:'',dateupdate:'' });
    }

    handleUpdate() {
        var today = new Date()

        // console.log("id update : "+this.state.idupdate)
        let newList = [];
        this.state.list.forEach(element => {
            if (element.id !== this.state.idupdate) {
                newList.push(element);
            }
            else{
                const updateTask = {
                    title: this.state.titleupdate,
                    text: this.state.taskupdate,
                    id: this.state.idupdate,
                    date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                };
                newList.push(updateTask);
            }
        });
        this.setState({
            list: newList
        }, () => {
            localStorage.setItem("todo", JSON.stringify(this.state.list));
        });
        this.handleHide()
    }

    handleSave() {
        // this.setState({ show: false });
    }

    onTaskChange = (event) => {
        this.setState({ task: event.target.value });
        // console.log("Task :" + event.target.value)
    }

    onTaskUpdate = (event) => {
        this.setState({ taskupdate: event.target.value });
        // console.log("Task :" + event.target.value)
    }


    onTitleChange = (event) => {
        this.setState({ title: event.target.value });
        // console.log("title :" + event.target.value)
    }
    onTitleUpdate = (event) => {
        this.setState({ titleupdate : event.target.value });
        // console.log("title :" + event.target.value)
    }

    handleClick(e) {
        var today = new Date()

        e.preventDefault();

        if (!this.state.task.length || !this.state.title.length) {
            return;
        }
        const newTask = {
            title: this.state.title,
            text: this.state.task,
            id: this.getKey(),
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        };
        // console.log(newTask)
        // var newList = this.state.list.concat(newTask);
        this.setState(prevState => ({
            list: prevState.list.concat(newTask),
            task: '',
            title: '',
        }), () => {
            localStorage.setItem("todo", JSON.stringify(this.state.list));
            localStorage.setItem('done', JSON.stringify(this.state.done));
        });
    }
    handleKey(event) {
        if (event.key === 'Enter') {
            // this.handleClick(event);
        }
    }


    removeTask(id) {
        let list = [];
        this.state.list.forEach(element => {
            if (element.id !== id) {
                list.push(element);
            }
        });
        this.setState({
            list: list
        }, () => {
            localStorage.setItem("todo", JSON.stringify(this.state.list));
        });
    }

    clearTask(id) {
        let end = [];
        this.state.done.forEach(element => {
            if (element.id !== id) {
                end.push(element);
            }
        });
        this.setState({
            done: end
        }, () => {
            localStorage.setItem("done", JSON.stringify(this.state.done));
        });
    }

    endTask(id) {
        let done = this.state.done
        let list = [];
        this.state.list.forEach(element => {
            if (element.id === id) {
                done.push(element);
            }
            if (element.id !== id) {
                list.push(element);
            }
        });
        this.setState({
            list: list,
            done: done
        }, () => {
            localStorage.setItem("todo", JSON.stringify(this.state.list));
            localStorage.setItem("done", JSON.stringify(this.state.done));
        });
    }

    undoTask(id) {
        let list = this.state.list
        let done = [];
        this.state.done.forEach(element => {
            if (element.id === id) {
                list.push(element);
            }
            if (element.id !== id) {
                done.push(element);
            }
        });
        this.setState({
            list: list,
            done: done
        }, () => {
            localStorage.setItem("todo", JSON.stringify(this.state.list));
            localStorage.setItem("done", JSON.stringify(this.state.done));
        });
    }

}

export default InputTask;
