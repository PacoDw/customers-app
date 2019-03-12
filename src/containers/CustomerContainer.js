import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { getCustomerByDni } from '../selectors/customers';
import CustomerEdit from './../components/CustomerEdit'
import CustomerData from './../components/CustomerData'
import { fetchCustomers, updateCustomer } from "./../actions";
import { SubmissionError } from 'redux-form';


class CustomerContainer extends Component {

  componentDidMount() {
    if (!this.props.customer)
      this.props.fetchCustomers()
  }

  handleSumbit = customer => {
    const { id } = customer
    // returnin to show the button send disabled
    return this.props.updateCustomer(id, customer)
      .catch(err => {
        console.log('err :', err);

        throw new SubmissionError(err)
      });
  }

  handleOnSubmitSuccess = () => {
    this.props.history.goBack()
  }

  handleOnBack = _ => {
    this.props.history.goBack()
  }

  renderBody = () => {
    return (
      <Route path="/customers/:dni/edit" children={
        ({ match }) => {
          const CustomerControl = match ? CustomerEdit : CustomerData
          return <CustomerControl
            {...this.props.customer}
            onSubmit={this.handleSumbit}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onBack={this.handleOnBack}
          />
        }
      } />
    )
  }

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
  customer: PropTypes.object,
  fetchCustomers: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  customer: getCustomerByDni(state, props)
})

const mapDispatchToProps = _ => (
  {
    fetchCustomers,
    updateCustomer,
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(CustomerContainer));