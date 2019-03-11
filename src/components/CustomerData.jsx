import React from 'react'
import PropTypes from 'prop-types'
import CustomersActions from './CustomersActions';

const CustomerData = ({name, dni, age, onBack}) => {
  return (
    <div>
      <div className="customer-data">
        <h2>Customer Data</h2>
        <div><strong>Name</strong><i>{name}</i></div>
        <div><strong>DNI<i>{dni}</i></strong></div>
        <div><strong>Years old<i>{age}</i></strong></div>
      </div>
      <CustomersActions>
          <button  onClick={onBack}>Cancel</button>
      </CustomersActions>
    </div>
  )
}

CustomerData.propTypes = {
  name: PropTypes.string.isRequired,
  dni: PropTypes.string.isRequired,
  age: PropTypes.number,
  onBack: PropTypes.func.isRequired,
}

export default CustomerData
