import React, { Component } from 'react';
import { connect } from 'react-redux';

const OtherSettingsPage = ( props ) =>
{
	

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
				<div className='input-group'>
					<div className='input-group__item'>
						<input className="text-input" placeholder='Add new session type'/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OtherSettingsPage;