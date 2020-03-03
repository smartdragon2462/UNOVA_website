import React from 'react';
import PropTypes from 'prop-types';
// import iconDotsLoader from '../../assets/icons/dots-loader.svg';
// import SVG from 'react-svg';

const WaitingValue = (props) => {
    if (props.value !== 0 && !props.value) {
        return ("");
    } else {
        return (<React.Fragment>{props.value}</React.Fragment>);
    }
};

WaitingValue.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
    ])
};

export default WaitingValue;
