import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { getCustomerByDni } from '../selectors/customers';
import CustomerEdit from './../components/CustomerEdit'
import CustomerData from './../components/CustomerData'
import { fetchCustomers } from "./../actions";

class CustomerContainer extends Component {

  componentDidMount() {
    if ( !this.props.customer)
      this.props.fetchCustomers()
  }

  handleSumbit = values => {
    console.log('values :', values);
  }

  handleOnBack = _ => {
    this.props.history.goBack()
  }

  renderBody = () => (
    <Route path="/customers/:dni/edit" children={
      ({ match }) => {
        const CustomerControl = match ? CustomerEdit : CustomerData
        return <CustomerControl  
                {...this.props.customer} 
                onSubmit={this.handleSumbit}
                onBack={this.handleOnBack}
                />
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
  fetchCustomers: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  customer: getCustomerByDni(state, props)
})

export default withRouter(connect(mapStateToProps, {fetchCustomers})(CustomerContainer));