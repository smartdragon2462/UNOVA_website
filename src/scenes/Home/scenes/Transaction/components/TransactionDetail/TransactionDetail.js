import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../../utilities';
import { Number } from '@ambrosus/react';
import { Link } from 'react-router-dom';
import info_icon from '../../../../assets/icons/info.svg';
import block_icon from '../../../../assets/icons/blocks.svg';
import './TransactionDetail.scss';
import { ShowMore } from '../../../../components';
import { StringEllipsis } from '../../../../components';
import axios from 'axios'

class TransactionDetails extends React.Component{
  constructor(props)
  {
      super(props);

      this.state ={
        netInfo: null,
      }
  }
  
  componentDidMount() { 
    axios
        .get("https://explorer-api.ambrosus.com/info")
        .then(res => {
            this.setState({ netInfo: res.data});
        })
  }

  set_val() { 
    this.transaction = this.props.data
  }

  render() {   
    const transaction = this.props.data
    
    const {
          gasPrice,
          gasCost,
          input,
          nonce,
          gasSent,
          gasUsed,
          transactionIndex,
          blockHash,
          blockNumber,
        } = transaction;    
    
     const timestamp = transaction.timestamp
        ? formatDate(transaction.timestamp, true): '-';
     const gasUsedPerc = (gasUsed / gasSent) * 100;

    return (
      <div>
      { 
        this.state.netInfo?
          <div className='TransactionDetails'>
          <div className='wrapper_detail'>
            <aside className='decoration'>
              <img src={info_icon} />
            </aside>
            <section>
              <div className='row'>
                <div className='keyValue small'>
                  <div className='key'>Nonce (Position)</div>
                  <div className='value'>
                    <Number value={nonce} /> ({transactionIndex || '-'})
                  </div>
                </div>

                <div className='keyValue'>
                  <div className='key'>Timestamp</div>
                  <div className='value'>{timestamp}</div>
                </div>
              </div>

              <div className='row'>
                <div className='keyValue small'>
                  <div className='key'>Nectar Used</div>
                  <div className='value'>
                    <Number value={gasUsed} /> ({gasUsedPerc.toFixed(3)}%) of{' '}
                    <Number value={gasSent} />
                  </div>
                </div>
{/* 
                <div className='keyValue'>
                  <div className='key'>"</div>
                  <div className='value'>
                    <Number value={gasPrice / 1000000000} /> Ambits
                  </div>
                </div>

                <div className='keyValue small'>
                  <div className='key'>Tx Fee</div>
                  <div className='value'>
                    <Number value={gasCost.ether} /> AMB
                  </div>
                </div> */}
              </div>

              <div className='row'>
                <div className='keyValue input_data'>
                  <div className='key'>Input Data</div>
                  {/* {input} */}
                  <ShowMore data={input !== '0x' ? input : '-'} />
                </div>

                {/* <div className="keyValue small">
                    <div className="key">Input Translated</div>
                    <div className="value">{input}</div>
                  </div> */}
              </div>
            </section>
          </div>

          {blockNumber && (
            <div className='wrapper_detail' style={{ marginTop: 30 }}>
              <aside className='decoration'>
                <img src={block_icon} />
              </aside>
              <section>
                <div className='row'>
                  <div className='keyValue'>
                    <div className='key'>Block {blockHash ? 'Hash' : 'Number'}</div>
                    <div className='value'>
                      <Link to={`/blocks/${blockHash || blockNumber}`}>
                        <StringEllipsis string={blockHash || blockNumber} />
                      </Link>
                    </div>
                  </div>

                  <div className='keyValue small'>
                    <div className='key'>Height / Confirmations</div>
                    <div className='value'>
                      <Number value={blockNumber} /> /{' '}
                      <Number value={this.state.netInfo.lastBlock.number - blockNumber} />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>: ""
      }
      </div>
    );
  };
}

TransactionDetails.propTypes = {
  data: PropTypes.object,
};

export default TransactionDetails;
