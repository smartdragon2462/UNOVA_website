import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { StringEllipsis } from '../../../components';
import { formatDate } from '../../../utilities';
import {bundleExpirationTime} from '../../../utilities/helpers';

const BundleDetails = ({ bundle }) => {
  if (!bundle) {
    return null;
  }

  const expirationTime = bundleExpirationTime(bundle);
  const days_left = Math.round((expirationTime * 1000 - +new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bundles_detail_header_infos">
        <div className="header_info_firstRow">
            <div className="header_info_item">
                <div className="info_title">
                    By
                </div>
                <div className="info_val">
                    <StringEllipsis string={bundle.uploader} />
                </div>
            </div>     
            <div className="header_info_item">
                <div className="info_title">
                    TX HASH
                </div>
                <div className="info_val">
                    <StringEllipsis string={bundle.txHash} />
                </div>
            </div>    
            <div className="header_info_item">
                <div >
                    Block
                </div>
                <div className="info_val">
                    {bundle.block.number}
                </div>
            </div>                       
        </div>
        <div className="header_info_secondRow">
            <div className="info_title">
                {formatDate(bundle.uploadTimestamp, true)}
            </div>
            <div className="info_title1">
                DURATION
            </div>
            <div className="info_val">
                {bundle.storagePeriods} year
                {bundle.storagePeriods > 1 ? 's' : ''}
            </div>
            <div className="info_title1">
                EXPIRATION DATE
            </div>
            <div className="info_val">
                {formatDate(expirationTime, true)}
            </div>
            <div className="info_last_col">
                <div className="info_title2">
                    {days_left} 
                </div>
                <div className="info_title3">
                    day{days_left > 1 ? 's' : ''} left
                </div>
            </div>
        </div>
    </div>
  );
};
export default BundleDetails;
