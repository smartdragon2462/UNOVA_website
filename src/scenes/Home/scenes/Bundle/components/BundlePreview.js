import React from 'react';
import { formatDate, timeSince } from '../../../utilities';
import {Link } from 'react-router-dom';
import { Number } from '@ambrosus/react';
// import { formValueSelector } from 'redux-form';
import {bundleExpirationTime} from '../../../utilities/helpers';


class BundlePreview extends React.Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        // console.log("gggg", this.props)
        const bundle = this.props.data;
        return(
            <div className = "bundle_detail-card" key={bundle._id}>
                <div className = "decoration">
                    <div className = "timeline">                                            
                        <div className = "timeline_icon"><img src={"/assets/images/Bundle-icon-dark.svg"} width="35" height="35" /></div>
                        <div className = "time_ago">{timeSince(bundle.uploadTimestamp)} ago</div>
                    </div>
                </div>
                <div className = "card-info">
                    <Link to = {`/bundles/${bundle.bundleId}`}><div className="bundles-list-detail-id">{bundle.bundleId}</div></Link>
                    <div className="bundles-detail-firstLine">
                        <div className = "bundles-list-detail-date">{formatDate(bundle.uploadTimestamp, true)}</div>
                        <span className="span">by</span>
                        <div className = "bundles-list-detail-HEX_val">
                            <Link to={`/addresses/${bundle.uploader}`}>
                                {bundle.uploader}
                            </Link>                            
                        </div>
                        <div className = "bundles-list-detail-percent">
                            <span className="span1">DURATION</span>
                            <div className = "bundles-list-detail-HEX_val">
                                {bundle.storagePeriods} year
                                {bundle.storagePeriods > 1 ? 's' : ''}
                            </div>
                            <div className="span1">EXPIRATION DATE</div>
                            <div className = "bundles-list-detail-HEX_val">{formatDate(bundleExpirationTime(bundle), true)}</div>
                        </div>
                    </div>  

                    <br/>
                    <div className="bundles-list-detail-info">  
                        <div>                                         
                            <span>{bundle.totalAssets + bundle.totalEvents} ENTRIES</span> 
                            <img src={"/assets/images/bundle_detail_icon.svg"} width="10" height="10" />
                            <span> {bundle.totalAssets}{' '} asserts</span> 
                            <img src={"/assets/images/bundle_event_icon.svg"} width="15" height="15" />
                            <span>{bundle.totalEvents}{' '} events</span> 
                        </div>
                    </div>  
                </div>                
            </div>
        )
    }
}

export default BundlePreview;