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
			error: '',
			expand: false,
			stayExpanded: false
		}

		this.onAmountChange = this.onAmountChange.bind( this );
		this.blurAmountHandler = this.blurAmountHandler.bind( this );
		this.clickListItemHandler = this.clickListItemHandler.bind( this );
		this.onAmountClick = this.onAmountClick.bind( this );
	}

	onAmountClick( e )
	{
		this.setState(() => ({stayExpanded: true}))
	}

	onAmountChange( e )
	{
		const amount = e.target.value;

		// The amount is not able to be deleted if we do not include this OR statement. We also have the regular expression to prevent the wrong input being entered
		if( !amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) )
		{
			if( amount <= (this.props.amountOwed / 100 ))
			{
				this.setState( () => ({amountPaid: amount, error: ''}) );
			}
			else
			{
				this.setState( () => ({ error: 'Debt Payment cannot be higher than Debt Owed' }) );
			}
		}
	};

	blurAmountHandler( e )
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
		}, 500);

		const amountPaid = parseFloat(e.target.value, 10) * 100;

		const record = { ...this.props.record, amountPaid };

		const amount = e.target.value;
		if( !amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) )
		{
			if( amount <= (this.props.amountOwed / 100 ))
			{
				this.setState( () => ({ error: ''}) );
			}
		}

		this.props.onSubmit( record );

		
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
		const debtInput = (
			<div>
				<input
					className='text-input margin-bottom-medium'
					type="text" 
					onClick={this.onAmountClick}
					value={this.state.amountPaid}
					onChange={this.onAmountChange}
					onBlur={this.blurAmountHandler}
				/>
				<span style={{color:"red"}}>{this.state.error}</span>
			</div>
		);

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
									{debtInput}
									<button 
										className='button--secondary margin-bottom-medium'
									>
										Save New Payment Amount
									</button>
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