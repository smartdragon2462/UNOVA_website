/*
 * Copyright: Ambrosus Inc.
 * Email: tech@ambrosus.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Transaction.scss';
import API from '../../api';

import TransactionDetails from './components/TransactionDetail/TransactionDetail';
import TransactionInfo from './components/TransactionInfo/TransactionInfo';
// import BundleUpload from './components/BundleUpload/BundleUpload';
// import TransactionEvent from './components/TransactionEvent';
import TransactionNav from  './components/TransactionNav/TransactionNav';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: null,
      bundle: null,
    };
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  componentDidMount() {
    API.getTransaction(this.props.match.params.hash).then(({ data }) => {
      !this.isCancelled &&
        this.setState({
          transaction: data,
        });

      if (data && data.contractCall && data.to_id.name === 'uploads') {
        this.loadBundle();
      }
    });
  }

  loadBundle() {
    API.getTransactionEvent(this.props.match.params.hash).then(({ data }) => {
      !this.isCancelled &&
        this.setState({
          event: data,
        });
    });
  }

  render() {
    return (
      <React.Fragment>
        <TransactionNav transaction={this.state.transaction} />
        <div className='transaction_page'>
          {this.state.transaction && (<TransactionInfo data={this.state.transaction} />
          )}
           {this.state.transaction && (<TransactionDetails data={this.state.transaction} />
          )}
          {/*
          {this.state.bundle && <BundleUpload data={this.state.bundle} />}
          {this.state.event && <TransactionEvent event={this.state.event} />} */}
        </div>
      </React.Fragment>
    );
  }
}

Transaction.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      hash: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Transaction;
