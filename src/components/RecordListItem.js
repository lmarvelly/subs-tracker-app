import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import { startEditRecord } from '../actions/records';

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
				alert('Cannot do that')
			}
		}
	};

	render()
	{
		const debtItem = (
			<div>
				<p>Debt amount: { `£${numeral(this.props.amountOwed / 100).format('0,0.00')}` }</p>
				£<input 
					type="text" 
					value={this.state.amountPaid}
					onChange={this.onAmountChange}
				/>
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

const mapDispatchToProps = ( dispatch, props ) => (
{
	startEditRecord: ( record ) => dispatch( startEditRecord(record.id, record.recordType, record) )
});

export default connect( undefined, mapDispatchToProps )( RecordListItem );