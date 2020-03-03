import React from 'react';
import { formatDate, timeSince } from '../../../utilities';
import {Link } from 'react-router-dom';
import { Number } from '@ambrosus/react';

class BlockPreview extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        const {data} = this.props
        return(
            <div className = "blocks_detail-card">
                <div className = "decoration">
                    <div className = "timeline">                                            
                        <div className = "timeline_icon"><img src={"/assets/images/block_list_ico.svg"} width="35" height="35" /></div>
                        <div className = "time_ago">{timeSince(data.timestamp)}</div>
                    </div>
                </div>
                <div className = "blocks-card-info">
                    <div className="blocks-list-detail-id">
                    <Link className='number' to={`/blocks/${data.number}`}>
                        {data.number}
                    </Link>
                    </div>
                    <div className="blocks-detail-firstLine">
                        <div className = "blocks-list-detail-date">{formatDate(data.timestamp, true)}</div>
                        <div className = "blocks-list-detail-HEX_val">{data.hash}</div>
                        <div className = "blocks-list-detail-percent"> (0.00%)</div>
                    </div>  

                    <br/>
                    <div className="blocks-list-detail-info">  
                        <div>                                         
                            <span>{data.totalTransactions}</span>TXn <span>{data.size}</span>bytes &nbsp;&nbsp;&nbsp; by<span className="detail1">
                                {data.miner}
                            </span>
                        </div>
                        <div className="usedInfo">of <Number fixed={false} value={data.gasLimit} /> nectar used </div>
                    </div>          
                    <hr/>
                </div>
            </div>
        )
    }
}

export default BlockPreview;