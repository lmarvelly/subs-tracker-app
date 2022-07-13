import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import SessionTypeForm from './SessionTypeForm';
import SessionTypeListItem from './SessionTypeListItem';
import { 
	startAddSessionType, startRemoveSessionType, 
	startEditSessionType
} from '../actions/otherSettings';

export const OtherSettingsPage = ( props ) =>
{
	const onSubmit = ( sessionType ) =>
	{
		props.addSessionType(sessionType);
	}

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
				
				<SessionTypeForm onSubmit={onSubmit} />

				<div className='list-header'>Session Types</div>
				<div className='list-body'>
				{
					(props.sessionTypes.length === 0) 
					?
					(
						<div className='list-item list-item--message'>
							<span>No Session Types </span>
						</div> 
					)
					:
					(
						props.sessionTypes.map( ( sessionType ) =>
						{
							return <SessionTypeListItem
										key={sessionType.sessionUuid} 
										sessionName={sessionType.sessionName}
										sessionUuid={sessionType.sessionUuid}
										editSessionType={props.editSessionType}
										removeSessionType={props.removeSessionType}/>
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
	addSessionType: ( sessionType ) => dispatch(startAddSessionType(sessionType) ),
	editSessionType: ( sessionUuid, updates ) => dispatch(startEditSessionType(sessionUuid, updates)),
	removeSessionType: ( sessionUuid ) => dispatch(startRemoveSessionType(sessionUuid))
});

const mapStateToProps = ( state ) =>
{
	return {
		sessionTypes: state.sessionTypes
	}
}

export default connect( mapStateToProps, mapDispatchToProps)(OtherSettingsPage);