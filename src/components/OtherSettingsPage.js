import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import PaymentTypeForm from './PaymentTypeForm';
import SessionNameForm from './SessionNameForm';
import OtherSettingsListItem from './OtherSettingsListItem';
import {
	startAddPaymentType, startRemovePaymentType
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

				<div className='list-header'>Session Names</div>
				<div className='list-body'>
				{
					(props.sessionNames.length === 0) 
					?
					(
						<div className='list-item list-item--message'>
							<span>No Session Names</span>
						</div> 
					)
					:
					(
						props.sessionNames.map( ( sessionName ) =>
						{
							return <OtherSettingsListItem
										key={sessionName.sessionUuid} 
										itemName={sessionName.sessionName}
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
							return <OtherSettingsListItem
										key={paymentType.paymentTypeUuid} 
										itemName={paymentType.paymentTypeName}
										paymentTypeUuid={paymentType.paymentTypeUuid}
										handleEdit={props.editPaymentType}
										handleRemove={props.removePaymentType}/>
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
	editSessionName: ( sessionUuid, sessionName ) => dispatch(startEditSessionName(sessionUuid, {sessionName})),
	removePaymentType: ( paymentTypeUuid ) => dispatch(startRemovePaymentType(paymentTypeUuid)),
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