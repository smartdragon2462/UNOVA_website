import React from 'react';
import '../style.css';
import { Number } from '@ambrosus/react';
import axios from 'axios'
import { timeSince } from '../../../utilities';
import {subscribeToInfoUpdate} from '../../../socket';

class BlockNav extends React.Component{
    constructor(props)
    {
        super(props);
        this.subscribe();
    } 

    state = {
        info_data: null,
        info_flag: false
    }

    subscribe = () => {         
        subscribeToInfoUpdate((err, netInfo) => {
        if (!err) {
            // console.log("AA", netInfo)
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
                this.setState({info_data: res.data, info_flag:true});
                // console.log("CC", res.data)
        });    
    }

    blockStatus = confirmations => {
        if (!confirmations && confirmations !== 0) {
            return null;
        }      
      return confirmations > 0 ? 'Confirmed' : 'Unconfirmed';
    };

    render(){
        const { block } = this.props;
        // console.log("gg", block)
        // let { number, size, timestamp  } = block;
        // const confirmations = 1000 - number;   
        return(
            <div className = "blocks_detail-informs-wrapper">
                <img src={"/assets/images/Blocks_icon.svg"} width="100" height="100" />   
                { 
                    block && this.state.info_data ?                    
                    <div className="blocks_detail-header-info-group">
                        <h2>Block <span>{block? block.number:0}</span></h2>
                        <hr/>
                        <div className="blocks_detail-header-infos">
                            <div className="blocks_detail-header-info-items">
                                <div className="blocks_detail-header-info-title">
                                    STATUS
                                </div>
                                <div className="blocks_detail-header-info-val1">
                                    {this.blockStatus(  this.state.info_data.lastBlock.number - block.number)}
                                </div>
                            </div>
                            <div className="blocks_detail-header-info-items">
                                <div className="blocks_detail-header-info-title">
                                    CONFIRMATIONS
                                </div>
                                <div className="blocks_detail-header-info-val">
                                    {this.state.info_data.lastBlock.number - block.number< 0 ? 0 : this.state.info_data.lastBlock.number - block.number}
                                </div>
                            </div>
                            <div className="blocks_detail-header-info-items">
                                <div className="blocks_detail-header-info-title">
                                    SIZE
                                </div>
                                <div className="blocks_detail-header-info-val">
                                    <Number value={block.size} /> Bytes
                                </div>
                            </div>
                            <div className="blocks_detail-header-info-items">
                                <div className="blocks_detail-header-info-title">
                                    CREATED
                                </div>
                                <div className="blocks_detail-header-info-val">
                                    {
                                        block.timestamp ? `${timeSince(block.timestamp)} ago` : null
                                    }
                                </div>
                            </div>                            
                        </div>
                    </div>:""
                }
            </div>
            );
        }
    }   
  export default BlockNav;