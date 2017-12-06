import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;


class BuyDirect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: '',
			LNKSExchange: null,
			success: '',
			failure: ''
		}

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({amount: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.LNKSExchange.deployed().then(exchange => {
			console.log("Exchange address:", exchange.address);
			
			exchange.buyDirect({
				from: this.props.account,
				value: this.props.web3.web3.toWei(this.state.amount, 'ether'),
				gas: 150000
			}).then(receipt => {
				this.setState({success: `Success! Transaction hash - ${receipt.tx}`});
			}).catch(error => {
				this.setState({failure: error.message});
			});			
		});
	}

	render() {
		return (
			<div className="col-xs-6 col-md-6">
				<h2>Buy directly</h2>

				<p style={{color: "green"}}>{this.state.success ? this.state.success : null}</p>
				<p style={{color: "red"}}>{this.state.failure ? this.state.failure : null}</p>						

				<Form onSubmit={this.handleSubmit}>
			        <FormItem>
			        	<Input type="number" onChange={this.handleChange} value={this.state.amount} placeholder="Amount to buy" />
			        </FormItem>

					<Button type="primary" htmlType="submit">Buy tokens</Button>
				</Form>
			</div>
		);
	}
};


function mapStateToProps(state) {
  return {
    LNKSExchange: state.LNKSExchange,
    account: state.account,
    web3: state.web3
  }
}

export default connect(mapStateToProps)(BuyDirect);