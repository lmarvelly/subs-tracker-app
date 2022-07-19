import React, { useEffect, useState  } from 'react';

const PaymentTypeForm = ( props ) =>
{
	const [ formError, setFormError ] = useState(undefined);
	const [ paymentTypeName, setPaymentTypeName ] = useState('');

	const onSubmit = (e) =>
	{
		e.preventDefault();

		let exists = false;

		const trimmedName = paymentTypeName.trim();

		// TODO: Add code to check if Payment Type already exists

		if( trimmedName === '' )
		{
			setFormError('Session name cannot be blank');
		}

		if( !exists && trimmedName )
		{
			props.onSubmit(trimmedName);
			setPaymentTypeName('');
			setFormError(undefined);
		}
	}

	const onPaymentTypeNameChange = (e) =>
	{
		if (e.target.value.trim()) 
		{
			setFormError(undefined);	
		}
		setPaymentTypeName(e.target.value);
	}

	return (
		<div>
			<form className='form' onSubmit={ onSubmit }>
				{ formError && <p className='form__error'>{formError}</p> }
				<input
					className="text-input"
					type="text"
					onChange={onPaymentTypeNameChange}
					placeholder="Add new payment method"
					value={paymentTypeName}
				/>
				<button className='button'>Add Payment Method</button>
			</form>
		</div>
	);
}

export default PaymentTypeForm;