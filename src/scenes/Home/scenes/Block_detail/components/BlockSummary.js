import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utilities';
import { Number } from '@ambrosus/react';
import { Progress } from 'reactstrap';

class BlockSummary extends Component {
    constructor(props)
    {
        super(props);
    } 
      render(){
        const { block } = this.props;
        let {
            gasUsed,
            nonce,
            gasLimit,
            hash,
            miner,
            transactions = [],
            contractCalls,
            parentHash,
            stateRoot,
            mineDuration,
        } = block;
    
        const totalTxs = transactions.length;
        const datetime = formatDate(block.timestamp, true);  
        const gasDiffPerc = (gasUsed / gasLimit) * 100;
        const data = block.extraData;
        const mineTime = mineDuration || 5;

        return(
            <div>
                <div className="blocks_detail-list-title">Block summary</div>   
                <div className = "detail-card">
                    <div className = "decoration">
                        <div className = "timeline">                                            
                            <div className = "timeline_icon"><img src={"/assets/images/block_list_ico.svg"} width="35" height="35" /></div>
                        </div>
                    </div>
                    <div className = "blocks_detail-card-info">
                        <div className="blocks_detail-list-detail-id">
                            MINER
                        </div>
                        <div className="blocks_detail-detail-firstLine">                                    
                            <div className = "blocks_detail-list-detail-HEX_val">{ miner }</div>
                            <div className = "blocks_detail-list-detail-date">{datetime}</div>
                            <div className = "blocks_detail-list-detail-percent">
                                <Number value={gasUsed} fixed={false} /> ({gasDiffPerc.toFixed(2)} %)
                            </div>
                        </div> 
                        <div className="blocks_detail-list-detail-info">  
                            <div className="block-miner-transaction">                                         
                                <span><Number value={totalTxs}/>  transactions</span> and <span><Number value={contractCalls || 0} /> contract calls transactions </span>in this block 
                            </div>
                            <span className="detail1">€ in {mineTime.toFixed(1)} sec.</span>
                            <div className="usedInfo">
                                <Number value={gasLimit} /> nectar used
                            </div>
                        </div> 
                        <Progress value={gasDiffPerc} />      
                    </div>   
                </div>
                <div className = "detail-card">
                    <div className = "decoration">
                        <div className = "timeline">                                            
                            <div className = "timeline_icon"><img src={"/assets/images/block_detail_hash_icon.svg"} width="30" height="30" /></div>
                        </div>
                    </div>
                    <div className="detail_contents">
                        <div className = "blocks_detail-hash-info">
                            <div className="blocks_detail-hash-content">
                                <div className="hash-title">HASH</div>
                                <div className="hash-value">{hash}</div>    
                            </div>  
                            <div className="blocks_detail-hash-content">
                                <div className="hash-title">NONCE</div>
                                <div className="hash-value">{nonce || 0}</div>
                            </div>                              
                        </div>
                        <br/>
                        <div className = "blocks_detail-hash-info">
                            <div className="blocks_detail-hash-content">
                                <div className="hash-title">PARENT HASH</div>
                                <div className="hash-value">{parentHash}</div>
                            </div>                               
                        </div>
                        <br/>
                        <div className = "blocks_detail-hash-info">
                            <div className="blocks_detail-hash-content">
                                <div className="hash-title">STATE ROOT HASH</div>
                                <div className="hash-value1">{stateRoot}</div>
                            </div>                               
                        </div>
                    </div>                            
                </div>
                <div className = "detail-card">
                    <div className = "decoration">
                        <div className = "timeline">                                            
                            <div className = "timeline_icon"><img src={"/assets/images/block_detail_data_icon.svg"} width="30" height="30" /></div>
                        </div>
                    </div>
                    <div className="detail_contents">
                        <div className = "blocks_detail-hash-info">
                            <div className="blocks_detail-hash-content">
                                <div className="hash-title">DATA</div>
                                <div className="hash-value1">{data}</div>
                            </div>                                                                 
                        </div>                                
                    </div>                            
                </div>     
            </div>
        )
    }     
  }   
  export default BlockSummary;
  