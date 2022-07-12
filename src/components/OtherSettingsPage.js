import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import SessionTypeForm from './SessionTypeForm';
import { startAddSessionType } from '../actions/otherSettings';

const OtherSettingsPage = ( props ) =>
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
				<h2>Session Types</h2>
				<SessionTypeForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}

const mapDispatchToProps = ( dispatch ) =>(
{
	startAddSessionType: ( sessionType ) => dispatch(startAddSessionType(sessionType) )
});

export default connect(undefined, mapDispatchToProps)(OtherSettingsPage);