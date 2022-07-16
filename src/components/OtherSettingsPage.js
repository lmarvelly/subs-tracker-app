import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import SessionNameForm from './SessionNameForm';
import SessionNameListItem from './SessionNameListItem';
import { 
	startAddSessionName, startRemoveSessionName, 
	startEditSessionName
} from '../actions/otherSettings';

export const OtherSettingsPage = ( props ) =>
{
	const onSubmit = ( sessionName ) =>
	{
		props.addSessionName({sessionName});
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
				
				<SessionNameForm 
					sessionNames={props.sessionNames}
					onSubmit={onSubmit} 
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
										editSessionName={props.editSessionName}
										removeSessionName={props.removeSessionName}/>
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
	addSessionName: ( sessionName ) => dispatch(startAddSessionName(sessionName) ),
	editSessionName: ( sessionUuid, updates ) => dispatch(startEditSessionName(sessionUuid, updates)),
	removeSessionName: ( sessionUuid ) => dispatch(startRemoveSessionName(sessionUuid))
});

const mapStateToProps = ( state ) =>
{
	return {
		sessionNames: state.sessionNames
	}
}

export default connect( mapStateToProps, mapDispatchToProps)(OtherSettingsPage);