import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import CustomerList from '../components/CustomerList';
import CustomersActions from '../components/CustomersActions';
import { fetchCustomers } from '../actions';
import { getCustomers } from '../selectors/customers';

class CustomerContainer extends Component {

  componentDidMount() {
    this.props.fetchCustomers();
  }

  renderBody = customers => (
    <div>
      <CustomerList 
        customers={customers}
        urlPath={'customers/'}
      />
      <CustomersActions>
        <button onClick={this.handleaddNew} >New customer</button>
      </CustomersActions>
    </div>
  )

  render() {
    return (
      <div>
        <AppFrame
          header="List of the Customers"
          body={this.renderBody(this.props.customers)}
        />
      </div>
    );
  }
}

CustomerContainer.propTypes = {
  fetchCustomers: PropTypes.func.isRequired,
  customers:  PropTypes.array.isRequired,
};

CustomerContainer.defaultProps = {
  customers: []
}

const mapDispatchToProps = { fetchCustomers }

const mapStateToProps = state => ({
  customers: getCustomers(state)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerContainer));