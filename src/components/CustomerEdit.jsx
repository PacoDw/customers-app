import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from "redux-form";
import { setPropsAsInitialValues } from '../higherOrderComponents/setPropsAsInitialValues';
import CustomersActions from './CustomersActions'
import { Prompt } from "react-router-dom";
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

const MyField = ({ input, meta, type, label, name }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...input} type={type ? type : "text"} />
      {
        meta.touched && meta.error && <span>{meta.error}</span>
      }
    </div>
  )
}

//  parse and format
const toNumber = value => value && Number(value)
const toUpper = value => value && value.toUpperCase()
const toLower = value => value && value.toLowerCase()
const ageRange = (value, previousValue, values) => (
  values && previousValue && (value > 17 && value < 100) ? value : previousValue
)

const CustomerEdit = ({ handleSubmit, submitting, onBack, pristine, submitSucceeded }) => {
  return (
    <div>
      <h2>Customer Edit</h2>
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          label="Name: "
          component={MyField}
          parse={toUpper}
          format={toLower}
        />
        <Field
          name="dni"
          label="Dni: "
          component={MyField}
          validate={isRequired} // Field Validation
          parse={toUpper}
        />
        <Field
          name="age"
          label="Age: "
          component={MyField}
          type="number"
          validate={[isRequired, isNumber]} // Field Validation
          parse={toNumber}
          normalize={ageRange}
        />
        <CustomersActions>
          <button type="submit" disabled={pristine || submitting}>Save</button>
          <button type="button" disabled={submitting} onClick={onBack}>Cancel</button>
          <Prompt 
            when={!pristine && !submitSucceeded}
            message="The data will be lost"
          />
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
