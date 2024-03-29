import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import PaymentTypeForm from './PaymentTypeForm';
import SessionNameForm from './SessionNameForm';
import OtherSettingsListItem from './OtherSettingsListItem';
import {
	startAddPaymentType,
	startEditPaymentType,
	startRemovePaymentType
} from '../actions/paymentTypes';
import { 
	startAddSessionName,
	startEditSessionName,
	startRemoveSessionName
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
						<h1 className='page-header__title'>Other Settings Page</h1>
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
										itemUuid={sessionName.sessionUuid}
										handleEdit={props.editSessionName}
										handleRemove={props.removeSessionName}/>
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
	addSessionName: ( sessionName ) => dispatch(startAddSessionName(sessionName)),
	editPaymentType: ( paymentTypeUuid, paymentTypeName ) => dispatch(startEditPaymentType( paymentTypeUuid, {paymentTypeName})),
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