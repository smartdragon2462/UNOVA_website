import React, { Component } from 'react';
import './SearchBar.scss';
import PropTypes from 'prop-types';
import API from '../../api';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.search();
  }

  handleClick(e) {
    e.preventDefault();
    this.search();
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  search() {
    // console.log("uuuu", this.props)
    const term = this.state.value;
    let search_bar = document.getElementsByClassName('search_bar__icon')[0];
    let lds_ripple = document.getElementsByClassName('lds-ripple')[0];
    if (!term) {
      return;
    }

    search_bar.style.display = 'none';
    lds_ripple.style.display = 'inline-block';

    API.searchItem(term)
      .then(data => {
        this.setState({
          value: '',
        });
        
        let searchTerm = data.data;
        
        if (searchTerm && searchTerm.term !== undefined) {
          const urlParts = data.meta.search.split("/");
          urlParts[urlParts.length - 1] = searchTerm.term;
          searchTerm = urlParts.join('/');
        } else {
          searchTerm = data.meta.search;
        }

        if (data.meta.search) {
          this.props.history.push(`/${searchTerm}`);
          search_bar.style.display = 'block';
          lds_ripple.style.display = 'none';
        } else {
          this.props.history.push('/notfound');

        }
      })
      .catch(() => {
        this.props.history.push('/notfound');
      });
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <div className = "searchBar-box">
                <input
                    className='search_bar__input'
                    value={this.state.value}
                    onChange={this.handleChange}
                    type='text'
                    placeholder="Search for Bundle, Block, Assets, ..."
                />                
                <div className="lds-ripple">
                    <div></div><div></div>
                </div>
                <img className="search_bar__icon" src={"/assets/icons/search1.svg"} width="20" height="30" onClick={this.handleClick}/>
            </div>
        </form> 
    );
  }
}

SearchBar.propTypes = {
    history: PropTypes.object,
};
// export default withRouter(inject('InfoStore')(observer(SearchBar)));
export default SearchBar;