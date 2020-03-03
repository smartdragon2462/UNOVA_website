/* global console */
/* global setInterval */

import React, { Component } from 'react';
// import SVG from 'react-svg';
import API from '../../../api';
// import { Link } from 'react-router-dom';
import { subscribeToNewBlock } from '../../../socket';
import LastBlockTimer from '../../../components/LastBlockTimer';
import { timeSince } from '../../../utilities';
import { Number } from '@ambrosus/react';
import { getNow } from '../../../utilities/time';

class BlocksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
      currentTime: getNow(),
    };

    this.loadBlocks();
    this.subscribe();

    // TODO: check why is this here - memory issue
    if (!this.isCancelled) {
      setInterval(() => {
        this.setState({ currentTime: getNow(),  });
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  parseBlocks(blocks) {
    const {netInfo} = this.props.InfoStore;
    if (!this.isCancelled) {
      const parsedBlocks = blocks.filter((block) => {
        if (!block.className) {
          block.className = '';
        }
        block.confirmed = netInfo.lastBlock.number > block.number;
        return block;
      }).slice(0, 10).sort((x, y) => {
        return y.number - x.number;
      });

      this.setState({blocks: parsedBlocks }, () => {
        this.props.InfoStore.setLastBlock(this.state.blocks[0]);
      })
    }
  }

  beautiful_block_minerStr = (m_str) =>{
    var length = m_str.length;
    return m_str.substr(0, 14)+"..."+m_str.substr(length-8, length);
  }

  loadBlocks() {
    API.getBlocks({limit: 10}).then((blocks) => {
      if (blocks.data.length) {
        this.parseBlocks(blocks.data);
      }
    });
  }

  subscribe() {
    subscribeToNewBlock((err, block) => {
      if (err) {
        console.error(err);
        return;
      }

      block.className = 'slide_right';
      this.parseBlocks([block, ...this.state.blocks]);
    });
  }

  render() {
    const {netInfo} = this.props.InfoStore;

    const blockElement = block => {
      const transactions = block.transactions ? block.transactions.length : 0;
      const status = netInfo.lastBlock.number - block.number <= 0 && 'unconfirmed';
      
      return (
        <div className="tab-item" key={block.index}>
            <div className="tab-card-id">
                <div className="tab-card-id-value">
                    <strong>{block.number}</strong>
                </div>
                <img src={"/assets/images/tab-car-ico.svg"} width="15" height="15"/>
            </div>
            <div className="tab-card-sn">{ this.beautiful_block_minerStr(block.miner) }</div>
            <hr/>
            <div className="tab-card-time"><Number value={transactions} /> TXn{transactions > 1 ? 's' : ''} {' '} {timeSince(block.timestamp)} ago</div>
        </div>

        // <div className={`block ${block.className} ${status}`} key={block.number}>
        //   <Link to={`/blocks/${block.number}`}>
        //     <h4 className='number'>{block.number}</h4>
        //     <div className='info'>
        //       <span className='transactions'>
        //         <Number value={transactions} /> TXn{transactions > 1 ? 's' : ''}
        //       </span>
        //       <span className='timeago'>
        //         {' '}
        //         {timeSince(block.timestamp)} ago
        //       </span>
        //     </div>
        //     <div className='address'>
        //       {block.miner.substr(0, 15)}...{block.miner.substr(-8)}
        //     </div>
        //   </Link>
        // </div>
      );
    };

    return (
        <section>
        { this.state.blocks.length > 0 ?
            <div className="blocks_form-tabs-wrapper">                    
                <div className="tab-item">
                    <div className="tab-first-time"><LastBlockTimer lastBlock={this.state.blocks[0]} /> sec</div>
                    <div className="tab-first-contents">Validators Pool </div>
                    <div className="tab-first-value"> {netInfo.validatorsPool ? netInfo.validatorsPool : 0}</div>
                </div>
                {this.state.blocks.map(block => blockElement(block))}

                {/* {
                    this.state.block_data.map((data,index) => (
                        <div className="tab-item" key={index}>
                            <div className="tab-card-id">
                                <div className="tab-card-id-value">
                                    <strong>{data.number}</strong>
                                </div>
                                <img src={"/assets/images/tab-car-ico.svg"} width="15" height="15"/>
                            </div>
                            <div className="tab-card-sn">{ this.beautiful_block_minerStr(data.miner) }</div>
                            <hr/>
                        <div className="tab-card-time">{ data.totalTransactions }TXn &nbsp;&nbsp;&nbsp;&nbsp;{timeSince(data.timestamp)}</div>
                        </div>
                    ))
                } */}
            </div>: ""
        }
        </section>      
    );
  }
}

export default BlocksList;
