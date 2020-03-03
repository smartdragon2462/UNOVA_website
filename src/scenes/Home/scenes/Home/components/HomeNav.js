import React, { Component } from 'react';
// import icon from '../../../../assets/icons/eye_gradient.svg';
// import ComponentLogo from '../../../../components/ComponentLogo';
// import { ToolTip } from '../../../../components';

import formatDate from '../../../utilities/formatDate';
import { Number } from '@ambrosus/react';
// import { observer, inject } from 'mobx-react';
import API from '../../../api';

class HomeNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suply: 'total',
      history: {},
    };
  }

  componentDidMount() {
    API.getTokenHistory().then(history => {
      !this.isCancelled && this.setState({ history });
    });
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  // loadBlocks() {
  //   API.getBlocks({limit: 10}).then((blocks) => {
  //     if (blocks.data.length) {
  //       this.parseBlocks(blocks.data);
  //     }
  //   });
  // }

  render() {
    
    // console.log("HomwNav_props", this.props.last_Block_data)
    
    // const {
    //   netInfo = {},
    //   tokenInfo = {},
    //   lastBlock = {},
    // } = this.props.InfoStore;

    // const {
    //     accounts
    // } = netInfo;

    // const {
    //   price_usd = 0,
    //   market_cap_usd = 0,
    // } = tokenInfo;

    // let initial_network_supply = 361477437.536;
    // let block_reward = 1.146237435108134836;

    // let total_supply = initial_network_supply + netInfo.lastBlock.number * block_reward;
    // this.setState({block_data: this.props.block})
    return (      
      <div className="form-informs-wrapper">
        <h6>Welcome to the</h6>
        <h2>UNOVA Explorer</h2>
        <div className="subtitle">which allows to view, analyze and
        </div>
        <div className="subtitle">check network events.</div>
        {
            this.props.last_Block_data ? 
            <div className="subtitle"><br/>Contacts developed
                {/* <span>{this.state.info_data.accounts.contracts}</span> */}
                Last block created
                <span>{                            
                    formatDate( this.props.last_Block_data.timestamp)
                }</span>
            </div>: ""
        }
        <h6>Blocks</h6>
      </div>
    );
  }
}

export default HomeNav;
