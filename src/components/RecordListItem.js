import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

/**
 * @param {*} props Is deconstructed into
 * 	dispatch - this is passed down from PaymentRecord when record was spread {...record}
 * 	id
 * 	playerUuid
 * 	amount
 * 	description
 * 	createdAt
 * 
 * No need to define mapStateToProps because everything we need,
 * including dispatch, is being passed down from PaymentRecord 
 */
class RecordListItem extends Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			amountPaid: this.props.amountPaid / 100,
			error: ''
		}

		this.onAmountChange = this.onAmountChange.bind( this );
		this.blurAmountHandler = this.blurAmountHandler.bind( this );
	}

	onAmountChange( e )
	{
		const amount = e.target.value;

		// The amount is not able to be deleted if we do not include this OR statement. We also have the regular expression to prevent the wrong input being entered
		if( !amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) )
		{
			if( amount <= (this.props.amountOwed / 100 ))
			{
				this.setState( () => ({amountPaid: amount}) );
			}
			else
			{
				this.setState( () => ({ error: 'Debt Payment cannot be higher than Debt Owed' }) );
			}
		}
	};

	blurAmountHandler( e )
	{
		const amountPaid = parseFloat(e.target.value, 10) * 100;

		const record = { ...this.props.record, amountPaid };

		this.props.onSubmit( record );
	}

	render()
	{
		const debtItem = (
			<div>
				<p>Debt amount: { `£${numeral(this.props.amountOwed / 100).format('0,0.00')}` }</p>
				<p>
					Debt Payment £
					<input 
						type="text" 
						value={this.state.amountPaid}
						onChange={this.onAmountChange}
						onBlur={this.blurAmountHandler}
					/>
				<span style={{color:"red"}}>{this.state.error}</span>
				</p>
			</div>
		);
		return(
			<div>
				<Link to={`/edit-record/${this.props.id}`}>
					<h2>Description: { this.props.description }</h2>
				</Link>
				<h3>Player: { this.props.name }</h3>
				<p>Season: { this.props.seasonName }</p>
				{
					this.props.recordType === 'PAYMENT' && <p>Payment Amount: { `£${numeral(this.props.amount / 100).format('0,0.00')}` }</p>
				}
				{
					this.props.recordType === 'DEBT' && debtItem
				}
				<p>Created At: { moment( this.props.createdAt).format( "DD-MM-YYYY") }</p>
			</div>
		);
	}
}

export default RecordListItem;