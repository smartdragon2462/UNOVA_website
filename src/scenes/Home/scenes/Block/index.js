import React from 'react';
import InfiniteList from '../../components/infinitList';
import BlockPreview from './components/blockPreview';
import './style.css';
import {Link } from 'react-router-dom';
import axios from 'axios'
import  API  from '../../api';
import { Number } from '@ambrosus/react';


class BlockView extends React.Component{
    constructor(props)
    {
        super(props);
        this.block_wrapper = null;        
        
        this.state = {
            info_data: null,
            info_flag: false,
            block_data: null,
            block_flag: false,
            blocks: [],
            metadata: {},
            params: {},
        }
    }
    
    getBlocks = (params = {}) => {
        // console.log(params)
        return API.getBlocks(params).then(blocks => {
          !this.isCancelled &&
            this.setState({ blocks: blocks.data, metadata: blocks.metadata });
          return blocks;
        });
    }

    componentWillUnmount(){
        this.isCancelled = true;
    }

    componentDidMount() {
        axios
            .get("https://explorer-api.ambrosus.com/info")
            .then(res => {
                this.setState({info_flag: true, info_data: res.data});
            })

        axios
            .get("https://explorer-api.ambrosus.com/blocks")
            .then(res => {
                // console.log("^^^ response: ", res)
                this.setState({block_flag: true, block_data: res.data.data});
            })
    }


    formatNumber = (num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    beautiful_block_minerStr = (m_str) =>{
        var length = m_str.length;
        return m_str.substr(0, 14)+"..."+m_str.substr(length-8, length);
    }


    render(){
        // console.log(this.block_wrapper)
        return(
            <div className = "formview-wrapper" ref = {ref => this.block_wrapper = ref}>
                <div className = "blocks-informs-wrapper">                   
                    <img src={"/assets/images/Blocks_icon.svg"} width="100" height="100" />
                    <div className="blocks-header-info-group">
                        <h2>Blocks</h2>
                        <hr/>
                        <div className="blocks-header-infos">
                            <div className="blocks-header-info-items">
                                <div className="blocks-header-info-title">
                                    TOTAL
                                </div>
                                <div className="blocks-header-info-val">
                                    {this.state.info_data? <Number fixed={false} value={this.state.info_data.lastBlock.number} />:"0" }
                                </div>
                            </div>
                            <div className="blocks-header-info-items">
                                <div className="blocks-header-info-title">
                                    AVG. BLOCK SIZE
                                </div>
                                <div className="blocks-header-info-val">
                                    {this.state.info_data? this.formatNumber(this.state.info_data.avgBlockSize.toFixed(1)): "0"} Bytes
                                </div>
                            </div>
                            <div className="blocks-header-info-items">
                                <div className="blocks-header-info-title">
                                AVG. BLOCK TIME
                                </div>
                                <div className="blocks-header-info-val">
                                    {this.state.info_data? this.state.info_data.avgBlockTime.toFixed(2):"0"} Sec
                                </div>
                            </div>
                            <div className="blocks-header-info-items">
                                <div className="blocks-header-info-title">
                                AVG. NECTAR USED
                                </div>
                                <div className="blocks-header-info-val1">
                                    {this.state.info_data? this.formatNumber(this.state.info_data.avgBlockGasUsed.toFixed(1)): "0" } ({ this.state.info_data? (this.state.info_data.avgBlockGasUsed/this.state.info_data.avgBlockGasLimit*100).toFixed(2): 0}%)
                                </div>
                            </div>                            
                        </div>
                    </div> 
                </div>
                <div className = "form-wrapper">                   
                    <div className = "all-block-list-group">
                        <div className="blocks-list-title">All Blocks</div>
                            <InfiniteList
                                withPagination={true}
                                dataSource={this.getBlocks}
                                element={BlockPreview}
                                endMessage='We advice you to use search to find an exact block.'
                            />
                    </div>
                </div>
            </div>
        )
    }
}
export default BlockView;