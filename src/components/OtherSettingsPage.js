import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import PaymentTypeForm from './PaymentTypeForm';
import SessionNameForm from './SessionNameForm';
import SessionNameListItem from './SessionNameListItem';
import {
	startAddPaymentType
} from '../actions/paymentTypes';
import { 
	startAddSessionName, startRemoveSessionName, 
	startEditSessionName
} from '../actions/sessionNames';

export const OtherSettingsPage = ( props ) =>
{
	const onSessionNameSubmit = ( sessionName ) =>
	{
		props.addSessionName({sessionName});
	}

	const onPaymentTypeSubmit = ( paymentTypeName ) =>
	{
		props.addPaymentType({paymentTypeName});
	};

	return(
		<div>
			<div className='page-header'>
				<div className='content-container'>
					<div className='page-header__content'>
						<h1 className='page-header__title'>Other Settings</h1>
					</div>
				</div>
			</div>

			<div className='content-container'>
				
				<SessionNameForm 
					sessionNames={props.sessionNames}
					onSubmit={onSessionNameSubmit} 
				/>

				<div className='list-header'>Session Types</div>
				<div className='list-body'>
				{
					(props.sessionNames.length === 0) 
					?
					(
						<div className='list-item list-item--message'>
							<span>No Session Types </span>
						</div> 
					)
					:
					(
						props.sessionNames.map( ( sessionName ) =>
						{
							return <SessionNameListItem
										key={sessionName.sessionUuid} 
										sessionName={sessionName.sessionName}
										sessionUuid={sessionName.sessionUuid}
										handleEdit={props.editSessionName}
										handleRemove={props.removeSessionName}/>
						})
					)
				}
				</div>

				<PaymentTypeForm onSubmit={onPaymentTypeSubmit} />

				<div className='list-header'>Payment Types</div>
				<div className='list-body'>
				{
					( props.paymentTypes.length === 0 )
					?
					(
						<div className='list-item list-item--message'>
							<span>No Payment Types Types </span>
						</div>
					)
					:
					(
						props.paymentTypes.map( ( paymentType ) =>
						{
							
							return <p>{paymentType.paymentTypeName}</p>
							
						})
					)
				}
				</div>
			</div>
		</div>
	);
}

const mapDispatchToProps = ( dispatch ) =>(
{
	addPaymentType: ( paymentType ) => dispatch(startAddPaymentType(paymentType)),
	addSessionName: ( sessionName ) => dispatch(startAddSessionName(sessionName) ),
	editSessionName: ( sessionUuid, updates ) => dispatch(startEditSessionName(sessionUuid, updates)),
	removeSessionName: ( sessionUuid ) => dispatch(startRemoveSessionName(sessionUuid))
});

const mapStateToProps = ( state ) =>
{
	return {
		sessionNames: state.sessionNames,
		paymentTypes: state.paymentTypes
	}
}

export default connect( mapStateToProps, mapDispatchToProps)(OtherSettingsPage);