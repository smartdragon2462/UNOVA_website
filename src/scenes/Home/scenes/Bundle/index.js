import React from 'react';
import './style.css';
import  API  from '../../api';
import {subscribeToInfoUpdate} from '../../socket';
import InfiniteList from '../../components/infinitList';
import { Number } from '@ambrosus/react';
import axios from 'axios'
import BundlePreview from './components/BundlePreview';
// import { observer, inject } from 'mobx-react';

class BundleView extends React.Component{
    constructor(props)
    {
        super(props);
        this.subscribe();

        this.state = {
            info_data: null,
            bundles: null,
        }    

        this.getBundles = this.getBundles.bind(this);
    }

    getBundles = (params ={}) => {
        // console.log("params", params)
        return API.getBundles(params).then(bundles => {
          !this.isCancelled && this.setState({ bundles });
        //   console.log("bundles",bundles)
          return bundles;
        });
    }
   
    componentWillUnmount() {
        this.isCancelled = true;
    }

    subscribe = () => {        
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
                this.setState({info_data: res.data});
        })
    }

    formatNumber = (num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    render(){    
        return(
            <div className = "formview-wrapper" ref = {ref => this.block_wrapper = ref}>
                <div className = "bundles-informs-wrapper">
                    <img src={"/assets/images/Bundle_icon.svg"} width="100" height="100" />                                       
                    <div className="bundles-header-info-group">                                      
                        <h2>Bundles</h2>
                        <hr/>
                        <div className="bundles-header-infos">
                            <div className="bundles-header-info-items">
                                <div className="bundles-header-info-title">
                                    TOTAL
                                </div>
                                <div className="bundles-header-info-val">
                                    {this.state.info_data?   <Number value={this.state.info_data.totalBundles || 0} />:0}
                                </div>
                            </div>
                            <div className="bundles-header-info-items">
                                <div className="bundles-header-info-title">
                                    ENTRIES TOTAL
                                </div>
                                <div className="bundles-header-info-val">
                                    {this.state.info_data? <Number value={this.state.info_data.totalAssets+this.state.info_data.totalEvents} />:0}
                                </div>
                            </div>
                            <div className="bundles-header-info-items">
                                <div className="bundles-header-info-title">
                                    AVERAGE BUNDLE LOAD
                                </div>
                                <div className="bundles-header-info-val">
                                    {this.state.info_data?  this.formatNumber((this.state.info_data.totalAssets+this.state.info_data.totalEvents)?((this.state.info_data.totalAssets+this.state.info_data.totalEvents) / this.state.info_data.totalBundles).toFixed(2) : 0):0} Entries
                                </div>
                            </div>
                            <div className="bundles-header-info-items">
                                <div className="bundles-header-info-title">
                                    24H ACTIVITY
                                </div>
                                <div className="bundles-header-info-val">
                                    {this.state.info_data?    <Number value={this.state.info_data.bundlesActivity || 0} />:0} bundles
                                </div>
                                <div className="bundles-header-info-val1">Created</div>
                            </div>                            
                        </div>
                    </div>  
                </div>
                <div className = "form-wrapper">                   
                    <div className = "all-block-list-group">
                        <div className="bundles-list-title">All Bundles</div>
                        <InfiniteList
                            // withPagination={true}
                            dataSource={this.getBundles}
                            element={BundlePreview}
                            endMessage='We advice you to use search to find an exact block.'
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default BundleView;