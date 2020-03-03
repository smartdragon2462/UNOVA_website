import React from 'react';
import {connect} from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import { SearchBar } from '../../components';

class Header extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        const {pathname} = this.props.location;
        return(
            <div className = "headerBar">
                <div className = "header">
                    <div className = "header-wrapper">
                        <div className = "logo">
                            <NavLink to={`/`}>
                                <img src={"/assets/images/UNOVA_logo.svg"} width="120" height="50" />
                            </NavLink>
                        </div>
                        <div className = "menu">
                            <Link to = {`/`} className = {pathname === '/' ? "item selected" : "item"}>Home</Link>
                            <Link to = {`/blocks`}  className = {pathname === '/blocks' ? "item selected" : "item"}>Blocks</Link>
                            <Link to = {`/bundles`}  className = {pathname === '/bundles' ? "item selected" : "item"}>Bundles</Link>
                            <SearchBar {...this.props}/>
                            {/* <div className = "search-box">
                                <input placeholder = "Search for Bundle, Block, Assets, ..."/>
                                <img src={"/assets/icons/search1.svg"} width="20" height="30" />
                            </div> */}
                        </div>
                      </div>
                </div>
            </div>
        )
    }
}

export default Header;
  