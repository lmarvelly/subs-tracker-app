import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import SessionTypeForm from './SessionTypeForm';
import SessionTypeListItem from './SessionTypeListItem';
import { startAddSessionType } from '../actions/otherSettings';

export const OtherSettingsPage = ( props ) =>
{
	const [sessionTypeList, setSessionTypeList] = useState([]);

	const onSubmit = ( sessionType ) =>
	{
		props.startAddSessionType(sessionType);
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
										sessionUuid={sessionType.sessionUuid}/>
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
	startAddSessionType: ( sessionType ) => dispatch(startAddSessionType(sessionType) )
});

const mapStateToProps = ( state ) =>
{
	return {
		sessionTypes: state.sessionTypes
	}
}

export default connect( mapStateToProps, mapDispatchToProps)(OtherSettingsPage);