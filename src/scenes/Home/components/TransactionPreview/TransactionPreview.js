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

import React from 'react';
import PropTypes from 'prop-types';
import './TransactionPreview.scss';

// import { ambToUSD } from '../../utilities/helpers';

import { transactionToType, formatDate, timeSince } from '../../utilities';

import block_icon from '../../assets/icons/blocks.svg';
import transaction_arrow from '../../assets/icons/transaction_arrow.svg';
import transaction_received from '../../assets/icons/transaction_received.svg';
import transaction_sent from '../../assets/icons/transaction_sent.svg';
import { Link } from 'react-router-dom';
// import { Currency } from '@ambrosus/react';
import { StringEllipsis } from '../../components';

const TransactionPreview = props => {
  const tx = props.transaction || props.data;
  // const { price_usd } = props.InfoStore.tokenInfo;

  const timestamp = tx.timestamp ? formatDate(tx.timestamp, true) : '';
  const timeAgo = tx.timestamp ? timeSince(parseInt(tx.timestamp)) : '';

  const { hash, blockNumber, status = '' } = tx;
  const fromAddress = tx.from;
  const toAddress = tx.to;
  // const ambValue = tx.value.ether.toFixed(5) || 0;
  // const usdValue = ambToUSD(ambValue, price_usd) || 0;

  return (
    <div className={`list__element TransactionPreview ${tx.className}`}>
      <aside className='decoration'>
        <div className='timeline'>
          <div className="timeline_icon">
            <img src={transactionToType(tx).icon} />
          </div>
          <div className='time_ago'>{timeAgo} ago</div>
        </div>
      </aside>

      <section>
        <div className={`data_tag card ${status.toLowerCase()}`}>
          <div className='info'>
            <div className='header'>
              <img className='icon' src={transactionToType(tx).icon} />
              <div className='title'>{transactionToType(tx).title}</div>
              <div className="status_icon">
                {tx.sent && (
                  <img src={transaction_sent} />
                )}
                {tx.received && (
                  <img src={transaction_received} />
                )}
              </div>
              <div className='date'>{timestamp}</div>
            </div>
            <div className='hash'>
              <Link to={`/transactions/${tx.hash}`}>
                <StringEllipsis string={hash} />
              </Link>
            </div>
            <div className='details'>
              <div className='from'>
                <Link to={`/addresses/${fromAddress}`}>
                  <StringEllipsis string={fromAddress} />
                </Link>
              </div>
              <div className="arrow">
                <img src={transaction_arrow} />
              </div>
              <div className='to'>
                <Link to={`/addresses/${toAddress}`}>
                  <StringEllipsis string={toAddress} />
                </Link>
              </div>
            </div>
          </div>
          <div className='block'>
            {blockNumber > 0 && (
              <div className='number'>
                <span>
                  <img src={block_icon} />
                </span>
                <Link to={`/blocks/${blockNumber}`}>{blockNumber}</Link>
              </div>
            )}
            {/* <div
              className={`priceAMB ${tx.sent ? 'sent' : ''} ${
                tx.received ? 'received' : ''
              }`}
            >
              <Currency value={ambValue || 0} symbol='AMB' />
            </div>
            <div className='priceUSD'>
              <Currency value={usdValue || 0} side='left' />
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

TransactionPreview.propTypes = {
  transaction: PropTypes.object,
  data: PropTypes.object,
};

export default TransactionPreview;
