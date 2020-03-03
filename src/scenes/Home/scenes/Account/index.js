import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Account.scss';
import API from '../../api';
import AccountNav from './Components/AccountNav/AccountNav';
import AccountBytecode from './Components/AccountBytecode/AccountBytecode';
import AccountTransactions from './Components/AccountTransactions';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        address: props.match.params.address,
        totalTx: 0,
      },
    };
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  componentDidMount() {
    this.loadAccount();
  }

  loadAccount() {
    API.getAccount(this.state.account.address).then(({ data }) => {
      !this.isCancelled &&
        this.setState({
          account: data,
        });
    });
  }

  render() {
    return (
      <React.Fragment>
        <AccountNav account={this.state.account} />
        <AccountBytecode account={this.state.account} />
        {this.state.account.address && (
        <AccountTransactions totalTx={this.state.account.totalTx}  address={this.state.account.address} />
        )}
      </React.Fragment>
    );
  }
}

Account.propTypes = {
  match: PropTypes.object,
};

export default Account;
