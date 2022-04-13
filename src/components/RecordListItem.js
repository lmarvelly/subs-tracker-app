import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import DebtPaymentForm from './DebtPaymentForm';

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
			error: '',
			expand: false,
			stayExpanded: false
		}

		this.clickListItemHandler = this.clickListItemHandler.bind( this );
		this.onDebtClick = this.onDebtClick.bind( this );
		this.onDebtBlur = this.onDebtBlur.bind( this );
	}

	onDebtClick( e )
	{
		this.setState(() => ({stayExpanded: true}))
	}

	onDebtBlur( e )
	{
		this.setState(() => (
		{
			expand: true
		}));
	
		setTimeout(() => {
			this.setState(() => (
			{
				stayExpanded: false
			}));
		}, 250);
	}

	clickListItemHandler(e)
	{
		if (this.props.recordType === 'DEBT') 
		{
			this.setState( () => ({amountPaid: this.props.amountPaid / 100}));
		}
		if (!this.state.stayExpanded) 
		{
			this.setState( () => ({expand: !this.state.expand}));
		}
	}

	render()
	{
		const listItem = (
			<div className='list-item' onClick={this.clickListItemHandler}>
				<div className='list-item__row'>
					<div>
						<h3 className='list-item__title'>{ this.props.description }</h3>
						<span className='list-item__sub-title'>{ this.props.name }</span>
					</div>
					<div>
						{
							this.props.recordType === 'PAYMENT' && (
								<h3 className='list-item__data-top'>
									Payment Amount: <span className='bold-font'>{`£${numeral(this.props.amount / 100).format('0,0.00')}` }</span>
								</h3>
							)
						}
						{
							this.props.recordType === 'DEBT' && (
								<div>
									<h3 className='list-item__data-top'>
										Debt Amount:
										<span className='bold-font'> 
											{ ` £${numeral(this.props.amountOwed / 100).format('0,0.00')}` }
										</span>
									</h3>
									<h3 className='list-item__data'>
										Debt Paid: 
										<span className='bold-font'> 
											{` £${numeral(this.props.amountPaid / 100).format('0,0.00')}`}
										</span>
									</h3>
								</div>
							)
						}
					</div>
				</div>
				{
					(this.state.expand || this.state.stayExpanded) && (
						<div className='list-item__row'>
							<div className='list-item__expanded-data'>
								<p>{ moment( this.props.createdAt).format( "DD-MM-YYYY") }</p>
								<p>{ this.props.seasonName }</p>
							</div>
							<div>
								<div>
									<div 
										onClick={this.onDebtClick}
										onBlur={this.onDebtBlur}
									>
										<DebtPaymentForm />
									</div>
								</div>
								
								<Link 
									to={`/edit-record/${this.props.id}`} 
									className='button'
								>
									Edit Full Record
								</Link>
							</div>
						</div>
					)
				}
			</div>
		);


		return(
			listItem
		);
	}
}

export default RecordListItem;