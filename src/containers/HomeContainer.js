import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import AppFrame from "./../components/AppFrame";
import CustomerActions from "./../components/CustomersActions";

class HomeContainer extends Component {

  handleOnClick = () => {
    this.props.history.push('/customers')
  }

  render() {
    return (
      <div>
        <AppFrame
          header="Home"
          body={
            <div>
              This is the main view
              <CustomerActions>
                <button onClick={this.handleOnClick}>List of the customers</button>
              </CustomerActions>
            </div>
          }
        />
      </div>
    )
  }
}

export default withRouter(HomeContainer)
