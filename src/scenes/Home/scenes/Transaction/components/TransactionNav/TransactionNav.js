import React from 'react';
import PropTypes from 'prop-types';
import './TransactionNav.scss';
import {  WaitingValue,  ComponentLogo,  StringEllipsis,} from '../../../../components';
import { transactionToType } from '../../../../utilities';

const TransactionsNav = props => {
  const transaction = props.transaction || {};
  const status = status => {
    if (!status) {
      return null;
    }
    return status.toLowerCase();
  };

  return (
    <div className='TransactionNav sub-header'>
      <div className='wrapper1'>
        <aside className='decoration'>
          <ComponentLogo
            icon={transaction.hash ? transactionToType(transaction).icon : null}
          />
        </aside>
        <section>
          <div className='info'>
            <h1 className='title'>{transactionToType(transaction).title}</h1>
            <div className='stats'>
              <div className='point hash'>
                <div className='key'>Hash</div>
                <h4 className='value'>
                  <WaitingValue
                    value={<StringEllipsis string={transaction.hash} />}
                  />
                </h4>
              </div>

              <div className='point status'>
                <div className='key'>Status</div>
                <h4 className={'value ' + status(transaction.status)}>
                  <WaitingValue value={status(transaction.status)} />
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// TransactionsNav.propTypes = {
//   transaction: PropTypes.object,
// };

export default TransactionsNav;
