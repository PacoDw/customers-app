import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { getCustomerByDni } from '../selectors/customers';
import CustomerEdit from './../components/CustomerEdit'
import CustomerData from './../components/CustomerData'

class CustomerContainer extends Component {

  renderBody = () => (
    <Route path="/customers/:dni/edit" children={
      ({ match }) => {
        const CustomerControl = match ? CustomerEdit : CustomerData
        return <CustomerControl  {...this.props.customer} />
      }
    } />
  )

  render() {
    return (
      <div>
        <AppFrame
          header={`Customer ${this.props.dni}`}
          body={this.renderBody()}
        />
      </div>
    );
  }
}

CustomerContainer.propTypes = {
  dni: PropTypes.string.isRequired,
  customer: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  customer: getCustomerByDni(state, props)
})

export default connect(mapStateToProps, null)(CustomerContainer);