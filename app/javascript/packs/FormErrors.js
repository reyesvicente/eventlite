import React from 'react'

const FormErrors = (props) =>
	<div>
		{Object.keys(props.formErrors).map((formErrorField) => {
			return (
				props.formErrors[formErrorField].map((error) => {
					return (
						<p>{formErrorField} {error}</p>
					)
				})
			)
		})}
	</div>

FormErrors.propTypes = {
	formErrors: PropTypes.object
}

export default FormErrors
