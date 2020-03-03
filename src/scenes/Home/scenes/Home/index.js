import React from 'react';
import './style.css';
import {Link } from 'react-router-dom';
import axios from 'axios'
import { formatDate, timeSince } from '../../utilities';
import {subscribeToNewBlock, subscribeToInfoUpdate} from '../../socket';
import LastBlockTimer from '../../components/LastBlockTimer';
import TransactionPreview from './components/TransactionPreview';
import InfiniteList from '../../components/infinitList';
import  API  from '../../api';
// import BlockList from './components/BlockList'
// import HomeNav from './components/HomeNav'


class HomeView extends React.Component {
    constructor(props)
    {
        super(props);
        this.subscribe();

        this.state = {
            info_data: null,
            block_data: null,
            loading: false,
            meta: {},
            params: {},
        }    
    }

    getTransactions=(params = {})=> {
        return API.getTransactions(params).then(transactions => {
          !this.isCancelled &&
            this.setState({
              meta: transactions.meta,
            });
          return transactions;
        });
    }
   
    componentWillUnmount() {
        this.isCancelled = true;
    }

    subscribe = () => {
        subscribeToNewBlock((err, block) => {
            if (err || !this.state.block_data) {
              console.error(err);
              return;
            }
      
            block.className = 'slide_right';

            // console.log("EE", this.state.block_data)
            // console.log("FF", block)

            this.setState({
                block_data: [block, ...this.state.block_data].slice(0, 10)
            })
          });
        
          
        subscribeToInfoUpdate((err, netInfo) => {
        if (!err) {
            this.setState({
                info_data: netInfo
            })
        }
        });    
    }

    componentDidMount() { 
        axios
            .get("https://explorer-api.ambrosus.com/info")
            .then(res => {
                this.setState({ info_data: res.data});
            })

        axios.get("https://explorer-api.ambrosus.com/blocks")
            .then(res => {
                this.setState({ block_data: res.data.data});
            })
    }

   
    beautiful_block_minerStr = (m_str) =>{
        var length = m_str.length;
        return m_str.substr(0, 14)+"..."+m_str.substr(length-8, length);
    }

    render() {
        return (
            <div className="formview-wrapper">
                <div className="form-informs-wrapper">
                    <h6>Welcome to the</h6>
                    <h2>UNOVA Explorer</h2>
                    <div className="subtitle">which allows to view, analyze and</div>
                    <div className="subtitle">check network events.</div>
                    <div className="subtitle"><br/>Contracts developed
                        <span>{ this.state.info_data? this.state.info_data.accounts.contracts: 0}</span>
                        Last block created
                        <span>{formatDate( this.state.block_data ?  this.state.block_data[0].timestamp: 0)}</span>
                    </div>
                    <h6>Blocks</h6>
                </div>    

                { this.state.block_data ?
                    <div className="form-wrapper">
                        <div className="blocks_form-tabs-wrapper">                    
                            <div className="tab-item">
                                <div className="tab-first-time"><LastBlockTimer lastBlock={this.state.block_data[0]} /> sec</div>
                                <div className="tab-first-contents">Validators Pool </div>
                                <div className="tab-first-value"> {this.state.info_data? this.state.info_data.validatorsPool:0}</div>
                            </div>
                            {
                                this.state.block_data.map((data,index) => (
                                    <div className="tab-item" key={index}>
                                        <Link to={`/blocks/${data.number}`}>
                                            <div className="tab-card-id">
                                                <div className="tab-card-id-value">
                                                    <strong>{data.number}</strong>
                                                </div>
                                                <img src={"/assets/images/tab-car-ico.svg"} width="15" height="15"/>
                                            </div>
                                            <div className="tab-card-sn">{ this.beautiful_block_minerStr(data.miner) }</div>
                                            <hr/>
                                            <div className="tab-card-time">{ data.totalTransactions }TXn &nbsp;&nbsp;&nbsp;&nbsp;{timeSince(data.timestamp)}</div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>  
                        <div className="form-details-wrapper">
                            <div className="block-list-title">Lastest transactions</div>
                                <InfiniteList
                                    withPagination={true}
                                    dataSource={this.getTransactions}
                                    element={TransactionPreview}
                                    endMessage='We advice you to use search to find an exact block.'
                                />
                        </div>

                        <div className="button-region">
                            <div className="load-all-btn" > 
                                Load all
                            </div>
                        </div>
                    </div> :""
                }
            </div>
        )
    }
}
export default HomeView;
