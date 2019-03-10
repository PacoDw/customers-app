import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerContainer from './containers/CustomerContainer';


class App extends Component {

  costumers = () => "/customers"
  costumersNew = () => "/customers/new"

  render() {
    return (
      <BrowserRouter >
        <div>
          <Route exact path="/" component={ HomeContainer} />
          <Route exact path="/customers" component={ CustomersContainer} />
          <Switch>
            <Route path="/customers/new" component={this.costumersNew} />
            <Route path="/customers/:dni" 
                   render={ props => <CustomerContainer {...props} dni={props.match.params.dni} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
