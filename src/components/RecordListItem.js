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
			amount: this.props.amount / 100,
			error: '',
			expand: false,
			stayExpanded: false
		}

		this.clickListItemHandler = this.clickListItemHandler.bind( this );
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

		const editSessionButton = (
			<Link 
				to={`/edit-session/${this.props.id}`} 
				className='button'
			>
				Edit Session
			</Link>
		);

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
									Payment Amount:
									<span className='bold-font'>
										{` £${numeral(this.props.amount / 100).format('0,0.00')}` }
									</span>
								</h3>
							)
						}
						{
							this.props.recordType === 'DEBT' && (
								<div>
									<h3 className={`list-item__data${classCollapsedName}`}>
										Debt Amount:
										<span className='bold-font'> 
											{` £${numeral(this.props.amount / 100).format('0,0.00')}`}
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
									<Link 
										to={`/edit-record/${this.props.id}`} 
										className='button'
									>
										Edit Record
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
						<div>
							<div className='list-item__row'>
								<div className='list-item__column'>
									<span className='list-item__sub-title'>Attended:</span>
									<ul className='list-item__expanded-data'>
									{
										this.props.playerNameList.map( (player) =>
											<li key={player.id}>
												{player.name}
											</li>
										)
									}
									</ul>
								</div>
								<div>
									<div>
										<h3 className={`list-item__data${classCollapsedName}`}>
											Session Amount: <span className='bold-font'>{`£${numeral(this.props.amount / 100).format('0,0.00')}` }</span>
										</h3>
									</div>
								</div>
							</div>
							<div className='list-item__row'>
								{editSessionButton}
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