import React from 'react';
import './style.css';
import API from '../../api';
import {StringEllipsis, WaitingValue}from '../../components';
import BundleDetails from './components/BundleDetails';
import BundleEntries from './components/BundleEntries';

class Bundle_detailView extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {            
            bundle: null,
        }
    }

    componentDidMount() {
        this.getBundle();
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    getBundle=()=> {
        const bundleId = this.props.match.params.bundleId;
    
        API.getBundle(bundleId).then(({ data }) => {
          !this.isCancelled && this.setState({ bundle: data });
        });
    }

    render(){
        return(
            <div className = "formview-wrapper">
                {this.state.bundle ?
                    <div className = "bundles_detail-informs-wrapper">
                        <img src={"/assets/images/Bundle_icon.svg"} width="100" height="100" />
                        <div className="bundles_detail-header-info-group">
                            <h2>Bundle Details</h2>
                            <hr/>
                            <div className="bundles_detail-header-infos">
                                <div className="bundles_detail-header-info-items">
                                    <div className="bundles_detail-header-info-title">
                                        BUNDLE ID
                                    </div>
                                    <div className="bundles_detail-header-info-val">
                                        {console.log("ddd",this.state.bundle )}
                                    <WaitingValue
                                        value={
                                            this.state.bundle.bundleId ? (
                                            <StringEllipsis string={this.state.bundle.bundleId} />
                                            ) : null
                                        }
                                    />
                                    </div>
                                </div>                                                       
                            </div>
                        </div>  
                    </div>:""
                }
                
                {this.state.bundle && <BundleDetails bundle={this.state.bundle} />}
                {this.state.bundle && <BundleEntries bundle={this.state.bundle} />}
            </div> 
        )
    }
}
export default Bundle_detailView;