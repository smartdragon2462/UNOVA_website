import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import SVG from 'react-svg';
import logoDecorator from '../../assets/icons/nw.svg';
import iconDotsLoader from '../../assets/icons/dots-loader.svg';
import './ComponentLogo.scss';

class ComponentLogo extends Component {
    shouldComponentUpade(){
        return false;
    }

    render() {
        return (<div className="page_logo">
            <img className={`page_logo__icon ${this.props.icon ? 'fadeIn' : 'loading'} ${this.props.className || ''}`} src={this.props.icon || iconDotsLoader} />
            <img className="page_logo__decorator" src={logoDecorator} />
            {this.props.children}
        </div>);
    }
}

ComponentLogo.propTypes = {
    icon: PropTypes.string,
    children: PropTypes.element,
    className: PropTypes.string,
};

export default ComponentLogo;
