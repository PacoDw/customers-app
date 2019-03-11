import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from "redux-form";
import { setPropsAsInitialValues } from '../higherOrderComponents/setPropsAsInitialValues';
import CustomersActions from './CustomersActions'
/* Field Validation */
const isRequired = value => (
  !value && "This field is required"
)

const isNumber = value => (
  isNaN(Number(value)) && "This field must be a number type"
)

/* Global Validation */
const validate = values => ({
  name: values.name ? null : "This field is required..."
})

const MyField = ({ input, meta, type, label, name }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input {...input} type={type ? type : "text"} />
    {
      meta.touched && meta.error && <span>{meta.error}</span>
    }
  </div>
)

const CustomerEdit = ({ handleSubmit, submitting, onBack }) => {
  return (
    <div>
      <h2>Customer Edit</h2>
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          label="Name: "
          component={MyField}
        />
        <Field
          name="dni"
          label="Dni: "
          component={MyField}
          validate={isRequired} // Field Validation
        />
        <Field
          name="age"
          label="Age: "
          component={MyField}
          type="number"
          validate={[isRequired, isNumber]} // Field Validation
        />
        <CustomersActions>
          <button type="submit" disabled={submitting}>Save</button>
          <button  onClick={onBack}>Cancel</button>
        </CustomersActions>
      </form>
    </div>
  )
}

CustomerEdit.propTypes = {
  name: PropTypes.string,
  dni: PropTypes.string,
  age: PropTypes.number,
  onBack: PropTypes.func.isRequired,
}

export default setPropsAsInitialValues(
  reduxForm(
    { 
      form: "CustomerEdit", 
      validate // global Validation 
    })(CustomerEdit))
