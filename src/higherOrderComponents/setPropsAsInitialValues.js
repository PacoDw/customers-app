import React, { Component } from "react";

export const setPropsAsInitialValues = WrappedComponent => (
  class extends Component {
    render() {
      return <WrappedComponent 
                {...this.props} 
                initialValues={this.props}
                enableReinitialize
                />
    }
  }
)