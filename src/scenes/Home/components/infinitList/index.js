
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroll-component';

import  removeArrayDuplicates  from '../../utilities/removeArrayDuplicates';

// import './InfiniteList.scss';
class InfiniteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: props.limit,
      meta: {},
      pagination: {},
      data: [],
      loading: false,
      params: props.params || {},
      loadedParams: {},
    };

    this.loadData = this.loadData.bind(this);

    if (this.props.socketDataSource) {
      this.props.socketDataSource((err, row) => {
        row.className = 'slide_down';
        if (this._isMounted) {
          this.setState({
            data: removeArrayDuplicates([
              row,
              ...this.state.data.map(_row => {
                _row.className = '';
                return _row;
              }),
            ]).slice(0, this.state.limit),
          });
        }
      });
    }
    this.scroll = false;
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  componentDidUpdate() {
    const changed = Object.keys(this.state.params).filter(
      key => this.state.loadedParams[key] !== this.state.params[key],
    ).length;
    if (changed && !this.state.loading && !this.isCancelled) {
      this.setState(
        {
          meta: {},
          pagination: {},
          loadedParams: JSON.parse(JSON.stringify(this.state.params)),
        },
        () => {
          this.loadData(true);
        },
      );
    }
  }

  loadData(force = false) {
    // console.log("fun-loadData", this.state)
    if (this.state.loading && this.isCancelled) {
      return;
    }
    !this.isCancelled &&
      this.setState(
        {
          loading: true,
        },
        () => {
          const params = JSON.parse(JSON.stringify(this.state.params)) || {};
          params.limit = params.limit || this.state.limit;

          if (this.state.pagination.hasNext) {
            if (this.props.withPagination) {
              params.page = this.state.pagination.next;
            } else {
              params.next = this.state.pagination.next;
            }
          }
          this.props.dataSource(params).then(res => {
            !this.isCancelled &&
              this.setState({
                data: !force
                  ? removeArrayDuplicates(this.state.data.concat(res.data))
                  : res.data,
                meta: res.meta,
                pagination: res.pagination,
                loading: false,
                loadedParams: JSON.parse(JSON.stringify(this.state.params)),
              });
          });
        },
      );
  }

  render() {
    const changed = Object.keys(this.state.params).filter(
      key => this.state.loadedParams[key] !== this.state.params[key],
    ).length;
    
    
    return (
      <div className='InfiniteList'>
        {!changed && (
          <InfiniteScroll
            params={this.state.params}
            dataLength={this.state.data.length}
            next={this.loadData}
            hasMore={this.state.pagination.hasNext}
          >
            {this.state.data.map((row, i) => (
              <this.props.element
                tokenInfo={this.props.tokenInfo}
                netInfo={this.props.netInfo}
                data={row}
                index={i}
                key={row._id}
                nodeName={this.props.nodeName}
              />
            ))}
          </InfiniteScroll>
        )}

        {/* {this.state.loading && (
          <div className='InfiniteList__loader'>Loading...</div>
        )} */}

        {!this.state.pagination.hasNext &&
          !this.state.loading &&
          this.props.endMessage && (
            <div className='InfiniteList__end'>{this.props.endMessage}</div>
          )}
      </div>
    );
  }
}

InfiniteList.propTypes = {
  dataSource: PropTypes.func.isRequired,
  limit: PropTypes.number,
  socketDataSource: PropTypes.func,
  endMessage: PropTypes.string,
  params: PropTypes.object,
  loadedParams: PropTypes.object,
};

export default InfiniteList;