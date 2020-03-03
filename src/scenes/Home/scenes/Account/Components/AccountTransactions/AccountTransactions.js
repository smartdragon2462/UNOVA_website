import React, { Component } from 'react';
import './AccountTransactions.scss';
import TransactionsByDate from '../../../../components/TransactionsByDate';
import TransactionPreview from '../TransactionPreview/TransactionPreview';
import API from '../../../../api';
import { Number } from '@ambrosus/react';
import icon from '../../../../assets/icons/transaction.svg';
import InfiniteList from '../../../../components/infinitList';

class AccountTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalTx: 0,
      loaded: false,
      transactions: [],
    };

    this.loadTransactions = this.loadTransactions.bind(this);
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  loadTransactions(params) {
    return API.getAccountTx(this.props.address, params).then(transactions => {
      !this.isCancelled &&
        this.setState({
          totalTx: transactions.meta.count,
          loaded: true,
          transactions,
        });

      transactions.data = transactions.data.filter(t => {
        t[t.to === this.props.address ? 'received' : 'sent'] = true;
        return t;
      });

      !this.isCancelled &&
        this.setState({
          totalTx: transactions.meta.count,
          transactions: transactions.data,
        });

      return transactions;
    });
  }

  render() {
    return (
      <div className='AccountTransactions'>
        {this.state.transactions.length > 0 && (
          <div className='wrapper'>
            <aside className='decoration'>
              <img className='timeline_icon timeline_icon__header' src={icon} />
            </aside>

            <section className={"transactions__nav"}>
              <h4 className='title'>
                <Number value={this.props.totalTx} /> Transaction
                {this.props.totalTx !== 1 && 's'}
              </h4>
              <TransactionsByDate address={this.props.address} />
            </section>
          </div>
        )}
        <div className='wrapper'>
          <section>
            <div className='transactions_list'>
              {this.state.loaded && this.state.transactions.length === 0 && (
                <p className='no_transactions_message'>
                  Address has no transactions.
                </p>
              )}
              <InfiniteList
                withPagination={true}
                dataSource={this.loadTransactions}
                limit={50}
                element={TransactionPreview}
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default AccountTransactions;
