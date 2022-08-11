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
 * 	sessionName
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
	}

	onDebtClick( e )
	{
		this.setState(() => ({stayExpanded: true}));
		
		const amountOwed = this.props.amountOwed;
		const amountPaid = this.props.amountPaid;
		const parsedAmountOwed = parseFloat(amountOwed / 100).toFixed(2);
		const parsedAmountPaid = parseFloat(amountPaid / 100).toFixed(2);

		const input = prompt(`Debt Amount: £${parsedAmountOwed}. Please make a payment of £${parsedAmountOwed} or less`, parsedAmountPaid);

		if ( input !== null && input !== '' && (!input || input.match(/^\d{1,}(\.\d{0,2})?$/))) 
		{
			if ((input * 100) > amountOwed) 
			{
				alert(`£${parseFloat(input).toFixed(2)} is more than the debt of £${parsedAmountOwed}`);
			}
			else
			{
				// Submit new debt payment
				const parsedInput = parseFloat(input, 10).toFixed(2);
				const amountPaid = parsedInput * 100;
				const record = { ...this.props.record, amountPaid };
				this.props.onSubmit( record );

				if (amountPaid === amountOwed) 
				{
					alert(`Player has paid off his debt of £${parsedAmountOwed}`);
				}
				else
				{
					alert(`Player has paid £${parsedInput} off his debt of £${parsedAmountOwed}`);
				}
			}
		}
		else if (input === '') 
		{
			alert(`Cannot enter an empty string`)
		}
		else if (input) 
		{
			alert(`${input} is invalid`);
		}

		// Prevent accidently shrinking component
		setTimeout(() => 
		{
			this.setState(() => ({stayExpanded: false}));
		}, 250);
	}

	clickListItemHandler(e)
	{
		if (!this.state.stayExpanded) 
		{
			this.setState( () => ({expand: !this.state.expand}));
		}
	}

	render()
	{
		// Needs this when it's collapsed
		const classCollapsedName = this.state.expand ? '' : '-top';

		const header = (
			<div>
				<div className='list-item__row'>
				<h3 className='list-item__title'>{ this.props.sessionName }</h3>
			</div>
			{
				(this.state.expand || this.state.stayExpanded) && <hr />
			}
			</div>
		)
		
		const paymentDebtItem = (
			<div className='list-item' onClick={this.clickListItemHandler}>
				{header}
				<div className='list-item__row'>
					<div>
						<span className='list-item__sub-title'>{ this.props.name }</span>
						{
							(this.state.expand || this.state.stayExpanded) && (
								<div className='list-item__expanded-data'>
									<span className='list-item__sub-title'>
										Date: {moment( this.props.createdAt).format( "DD-MM-YYYY")}
									</span>
									<span className='list-item__sub-title'>
										Season: { this.props.seasonName }
									</span>
								</div>
							)
						}
					</div>
					<div>
						{
							this.props.recordType === 'PAYMENT' && (
								<h3 className={`list-item__data${classCollapsedName}`}>
									Payment Amount: <span className='bold-font'>{`£${numeral(this.props.amount / 100).format('0,0.00')}` }</span>
								</h3>
							)
						}
						{
							this.props.recordType === 'DEBT' && (
								<div>
									<h3 className={`list-item__data${classCollapsedName}`}>
										Debt Amount:
										<span className='bold-font'> 
											{` £${numeral(this.props.amountOwed / 100).format('0,0.00')}`}
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
						<div>
							<div className='list-item__row'>
								<div className='list-item__expanded-buttons'>
									{
										this.props.recordType === 'DEBT' && (
											<button
												className='button--secondary'
												onClick={this.onDebtClick}
											>
												Make Debt Payment
											</button>
										)
									}
									
									<Link 
										to={`/edit-record/${this.props.id}`} 
										className='button'
									>
										Edit Full Record
									</Link>
								</div>
							</div>
						</div>
					)
				}
			</div>
		);

		const sessionItem = (
			<div className='list-item' onClick={this.clickListItemHandler}>
				{header}
				{
					(this.state.expand || this.state.stayExpanded) && (
						<div className='list-item__row'>
							<div className='list-item__column'>
								<span className='list-item__sub-title'>Attended:</span>
								{
									this.props.playerNameList.map( player =>(
										<span className='list-item__data'>{player}</span>
									))
								}
							</div>
							<div>
								<div>
									<h3 className={`list-item__data${classCollapsedName}`}>
										Session Amount: <span className='bold-font'>{`£${numeral(this.props.amount / 100).format('0,0.00')}` }</span>
									</h3>
								</div>
							</div>
						</div>
					)
				}
			</div>
		);

		return(
			this.props.recordType === 'SESSION' ? sessionItem : paymentDebtItem
		);
	}
}

export default RecordListItem;