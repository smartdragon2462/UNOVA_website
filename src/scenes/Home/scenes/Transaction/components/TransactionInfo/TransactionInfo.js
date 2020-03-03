import React from 'react';
import { observer, inject } from 'mobx-react';
import { Currency } from '@ambrosus/react';
import { StringEllipsis } from '../../../../components';
import { ambToUSD } from '../../../../utilities/helpers';

// import SVG from 'react-svg';
import account_icon from '../../../../assets/icons/account.svg';
import transaction_arrow from '../../../../assets/icons/transaction_arrow.svg';
import { Link } from 'react-router-dom';

import './TransactionInfo.scss';

const TransactionInfo = props => {
  const transaction = props.data;

  if (!transaction) {
    return null;
  }

  // const { price_usd } = props.InfoStore.tokenInfo;
  const ambValue = transaction.value.ether || 0;
  // const usdValue = ambToUSD(ambValue, price_usd) || 0;

  return (
    <div className='TransactionInfo'>
      <div className='wrapper_info'>
        <aside className='decoration'>
          <img src={account_icon}/>
        </aside>
        <section>
          {transaction.from && (
            <div className='from'>
              <div className='label'>From</div>
              <div className='address'>
                <Link to={`/addresses/${transaction.from}`}>
                  <StringEllipsis string={transaction.from} />
                </Link>
              </div>
              {transaction.from && (
                <div className='balance'>
                  {/* Current balance:{' '} */}
                  {/* <span className='color_blue'>
                    <Currency
                      value={(transaction.from_id === undefined) ? 0 : transaction.from_id.balance.ether}
                      symbol='AMB'
                      fixed={2}
                    />
                  </span> */}
                </div>
              )}
            </div>
          )}
          <div className='transition'>
            <div className='icon'>
              <img src={transaction_arrow} />
            </div>
            {/* <div className='value_amb color_blue'>
              <Currency symbol='AMB' value={ambValue} fixed={5} />
            </div> */}
            <div className='value_usd'>
              {/* <Currency side='left' value={usdValue} fixed={8} /> */}
            </div>
          </div>
          {transaction.to && (
            <div className='to'>
              <div className='label'>To</div>
              <div className='address'>
                <Link to={`/addresses/${transaction.to}`}>
                  <StringEllipsis string={transaction.to} />
                </Link>
              </div>
              {transaction.to_id && (
                <div className='balance'>
                  {/* Current balance:{' '}
                  <span className='color_blue'>
                    <Currency
                      fixed={5}
                      value={transaction.to_id.balance.ether}
                      symbol='AMB'
                    />
                  </span> */}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionInfo;
