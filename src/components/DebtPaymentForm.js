import React from 'react';

export const DebtPaymentForm = () => (
	<form>
		<input
			className='text-input margin-bottom-medium'
			type="text" 
		/>
		<button 
			className='button--secondary margin-bottom-medium'
		>
			Save Debt Payment
		</button>
	</form>
);

export default DebtPaymentForm;