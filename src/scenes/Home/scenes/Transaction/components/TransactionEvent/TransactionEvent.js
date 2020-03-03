import React from 'react';
import PropTypes from 'prop-types';

import './TransactionEvent.scss';

const TransactionEvent = ({ event }) => {
    return (<div className="wrapper">
        <div className="transaction_event">
            <div className="keyValue">
                <h4>Event Id</h4>
                <p>{event.eventId}</p>
            </div>
            <div className="keyValue">
                <h4>Signature</h4>
                <p>{event.signature}</p>
            </div>
            <div className="keyValue">
                <h4>Signature</h4>
                {event.raw && event.raw.map((signature, i) => { return (<p key={i}>{signature.data}</p>); })}
            </div>
        </div>
    </div>);
};

TransactionEvent.propTypes = {
    event: PropTypes.object,
};

export default TransactionEvent;
