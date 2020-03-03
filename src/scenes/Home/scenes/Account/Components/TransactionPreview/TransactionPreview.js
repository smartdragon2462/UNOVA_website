import React from 'react';
import { transactionToType,formatDate, timeSince } from '../../../../utilities';
import transaction_id_icon from '../../../../assets/icons/transaction_id_icon.svg';
import arrow_icon from '../../../../assets/icons/arrow.svg';
import {Link } from 'react-router-dom';
import {  StringEllipsis,} from '../../../../components';
import './TransactionPreview.scss';
import transaction_received from '../../../../assets/icons/transaction_received.svg';
import transaction_sent from '../../../../assets/icons/transaction_sent.svg';

class TransactionPreview extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        const {data} = this.props
        return(
            <div className="detail-card" key={data._id}>
                <div className="decoration">
                    <div className="timeline">
                        <div className="timeline_icon">
                            <img src={transactionToType(data).icon} width="35" height="35"/></div>
                        <div className="time_ago">{timeSince(data.timestamp)}</div>
                    </div>
                </div>
                <div className="card-info">
                    <div className="transaction_first_row">
                        <div className="block-list-detail-id">
                            <strong>{transactionToType(data).title}</strong>
                        </div>
                        <div className="status_icon">
                            {data.sent && (   <img src={transaction_sent} /> )}
                            {data.received && ( <img src={transaction_received} /> )}
                        </div>
                        <div className="block-list-detail-date">{formatDate(data.timestamp, true)}</div>
                        <div className="trasaction-list-id-col">
                            <div className="trasaction-list-id-img">
                                <img src={transaction_id_icon} width="20" height="20"/>
                            </div>
                            <div className="trasaction-list-id">
                                <Link to={`/blocks/${data.blockNumber}`}>{data.blockNumber}</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="transaction-list-HEX_val">
                        <Link to={`/transactions/${data.hash}`}>
                            <StringEllipsis string={data.hash} />
                        </Link>
                    </div>
                    <div className="block-detail-firstLine">
                        <div className="block-list-detail-HEX_val">
                            <Link to={`/addresses/${data.from}`}>
                                {data.from}
                            </Link>
                        </div>
                        <div className="">
                            <img src={arrow_icon} width="15" height="10"/>
                        </div>
                        <div className="block-list-detail-percent">                            
                            <Link to={`/addresses/${data.to}`}>
                                {data.to}
                            </Link>
                        </div>
                    </div>
                    <hr/>
                </div>                
            </div>
        )
    }
}

export default TransactionPreview;