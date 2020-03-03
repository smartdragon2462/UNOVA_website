import React from 'react';
import './style.css';
import {Link } from 'react-router-dom';
import API from '../../api';
import BlockSummary from './components/BlockSummary';
import BlockNav from './components/BlockNav';

class Bundle_detailView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          block: null,
        };
        this.getBlock(this.props.match.params.hash);
    }

    getBlock(hash) {
        API.getBlock(hash).then(({ data }) => {
          !this.isCancelled &&
            this.setState({
              block: data,
            });
        });
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    render(){
        return(
            <div className = "formview-wrapper">
                 <BlockNav block={this.state.block} />
                <div className = "form-wrapper">                   
                    <div className = "blocks_detail_all-block-list-group">
                        {this.state.block && <BlockSummary block={this.state.block} />}
                    </div>
                </div>
            </div>
        )
    }
}
export default Bundle_detailView;