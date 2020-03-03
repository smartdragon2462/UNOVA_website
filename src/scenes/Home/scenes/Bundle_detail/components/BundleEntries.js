import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import SVG from 'react-svg';
// import iconEntries from '../../../../assets/icons/entries.svg';

// import iconAsset from '../../../ assets/icons/asset_icon.svg';
// import iconEvent from '../../../assets/icons/event_icon.svg';
import { Progress } from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { StringEllipsis } from '../../../components';
import InfiniteList from '../../../components/infinitList';
import { BUNDLE_MAX_LOAD } from '../../../constants';
import API from '../../../api';
// import {Link } from 'react-router-dom';

class BundleEntries extends Component {
  constructor(props) {
    super(props);

    this.state = {
        assetsOrEvents : "Assets",
    }

    this.getEvents = this.getEvents.bind(this);
    this.getAssets = this.getAssets.bind(this);
  }

  getEvents(params) {
    return (
      this.props.bundle.bundleId &&
      API.getBundleEvents(this.props.bundle.bundleId, params).then(events => {
        return events;
      })
    );
  }

  getAssets(params) {
    return (
      this.props.bundle.bundleId &&
      API.getBundleAssets(this.props.bundle.bundleId, params).then(events => {
        return events;
      })
    );
  }

  render() {
    const bundle = this.props.bundle || {};
    const { node, totalEvents = 0, totalAssets = 0, size } = bundle;
    const total = totalEvents + totalAssets;
    const cost = bundle.uploadFee.ether;
    const entry = ({ data, index }) => {
      const item = data;
      const isEvent = item.eventId && !!item.eventId.length > 0;
      const ambURL = process.env.REACT_APP_AMB_TO_API_URL || 'https://amb.to'
      const url = `${ambURL}/${item.assetId}${
        isEvent ? '/events/' + item.eventId : ''
      }`;

      return (
        <div className='entry' key={index}>
          {/* <SVG className='entry__icon' src={isEvent ? iconEvent : iconAsset} /> */}
            <div className = "detail-card">
                <div className = "decoration">
                    <div className = "timeline">                                            
                        <div className = "timeline_icon"><img src={isEvent ? "/assets/images/event_icon.svg": "/assets/images/entry_icon.svg"} width="35" height="35" /></div>
                    </div>
                </div>
                <div className = "card-info">
                    <div className="bundles_detail-list-detail-id">
                        {/* <Link target='_blank' to={url} className='entry__id'> */}
                            {isEvent ? (
                                <StringEllipsis string={item.eventId} />
                                ) : (
                                <StringEllipsis string={item.assetId} />
                                )}
                         {/* </Link> */}
                    </div>               
                  </div>
            </div>



          {/* <Link target='_blank' to={url} className='entry__id'>
            {isEvent ? (
              <StringEllipsis string={item.eventId} />
            ) : (
              <StringEllipsis string={item.assetId} />
            )}
          </Link> */}
        </div>
      );
    };

    return (
        <div className = "form-wrapper"> 
            <div className="bundles_detail-list-title">Entries</div>    
            <div className = "all-block-list-group">                        
                <div className = "action-btn-section">
                    <div className="bundle_detail_lists">
                        <div>
                            <Tabs className="tabs1">
                                <TabList id="tablist1">
                                    <Tab>                                
                                        {/* <span className='meta'>{totalAssets}</span> */}
                                        <div className = {this.state.assetsOrEvents === "Assets" ? "btn active" : "btn"}
                                            onClick = {()=>{
                                                this.setState({
                                                    assetsOrEvents: "Assets"
                                                })
                                            }}
                                        >
                                            Asset{totalAssets === 1 ? '' : 's'}{' '}<span>{totalAssets}</span> 
                                        </div>
                                    </Tab>
                                    <Tab>
                                    <div className = {this.state.assetsOrEvents === "Events" ? "btn active" : "btn"}
                                        onClick = {()=>{
                                            this.setState({
                                                assetsOrEvents: "Events"
                                            })
                                        }}
                                        >
                                            Event{totalEvents === 1 ? '' : 's'}{' '}<span>{totalEvents}</span> 
                                        </div>
                                    </Tab>
                                </TabList>

                                <TabPanel>
                                    <InfiniteList dataSource={this.getAssets} element={entry} />
                                </TabPanel>

                                <TabPanel>
                                    <InfiniteList dataSource={this.getEvents} element={entry} />
                                </TabPanel>
                            </Tabs>                   
                        </div> 

                        <div className="bundle_detail_subInfos">
                            <div className="title">
                                Bundle Size
                            </div>
                            <div className="val">
                                {Math.round(size / 10000) / 100} MB
                            </div>
                            <div className="title">
                                Bundle load
                            </div>
                            <Progress value={Math.round((total / BUNDLE_MAX_LOAD) * 10000) / 100}/>
                            <div className="val">
                                {Math.round((total / BUNDLE_MAX_LOAD) * 10000) / 100}%
                            </div>
                            <div className="title">
                                Node
                            </div>
                            <div className="val">
                                Hermes
                            </div>
                        </div>
                    </div>            
                </div>   
                {/* <div className="bundle_detail_lists">
                    <div>
                    {
                        this.state.assetsOrEvents === "Assets" ?  [0,1,2,3,4,5,6,7,8,9].map((index) => (
                            <div className = "detail-card" key = {`detail-card-${index}`}>
                                <div className = "decoration">
                                    <div className = "timeline">                                            
                                        <div className = "timeline_icon"><img src={"/assets/images/entry_icon.svg"} width="35" height="35" /></div>
                                    </div>
                                </div>
                                <div className = "card-info">
                                    <div className="bundles_detail-list-detail-id">0xb681cea3ce5259c54b1251e4197202e85e45a977231c0995f5443820f38273df</div>
                                </div>                                        
                            </div>
                        )) : [0,1,2,3,4,5,6,7,8,9].map((index) => (
                            <div className = "detail-card" key = {`detail-card-${index}`}>
                                <div className = "decoration">
                                    <div className = "timeline">                                            
                                        <div className = "timeline_icon"><img src={"/assets/images/event_icon.svg"} width="35" height="35" /></div>
                                    </div>
                                </div>
                                <div className = "card-info">
                                    <div className="bundles_detail-list-detail-id">0xbettet35344b1251e4197202e4585e45345gea9772234er2345e453edyy7543</div>
                                </div>                                
                            </div>
                        ))
                    }
                    </div>

                    <div className="bundle_detail_subInfos">
                        <div className="title">
                            Bundle Size
                        </div>
                        <div className="val">
                            1.88 MB
                        </div>
                        <div className="title">
                            Bundle load
                        </div>
                        <Progress value="12.91" />
                        <div className="val">
                            12.91%
                        </div>
                        <div className="title">
                            Node
                        </div>
                        <div className="val">
                            Hermes
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
  }
}

export default BundleEntries;
