import React, { Component } from 'react';
import tasks from './tasks.svg';
import './App.css';
import {Grid,Row,Col } from 'react-bootstrap';
import InputTask from './component/InputTask';

class App extends Component {
	constructor(props) {
		super(props);
		if (localStorage.getItem("todo") === null) {
			localStorage.setItem('todo',[]);
		}
        
    }

	render() {
		return (
			<div className="App">
			
				<Grid>
					<Row className="show-grid">
						<Col xs={12} md={12}>
							<div className="containner">
								<Col xs={8} md={8} mdOffset={2} xsOffset={2}>
									<div className="panel row">
										<img src={tasks} className="App-logo" alt="tasks" />
										<InputTask />
									</div>
									<span>© 2018 LAPHAT-RADA WISADSRI ALL RIGHTS RESERVED</span>
								</Col>
							</div>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}

}


export default App;
