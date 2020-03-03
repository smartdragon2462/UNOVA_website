
import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-svg';
import metadata_icon from '../../../../assets/icons/meta_data.svg';

import { Link } from 'react-router-dom';

import './BundleUpload.scss';

const BundleUpload = (props) => {

  const bundle = props.data;
  const { bundleId, signature, size, node, totalEvents, totalAssets } = bundle;

  return (<React.Fragment>
    {bundle && <div className="bundle_tx__info">
      <div className="wrapper_upload">
        <div className="icon"><SVG src={metadata_icon} /></div>
        <div className="data">
          <div className="item">
            <div className="label">Bundle ID</div>
            <div className="address"><Link to={`/bundles/${bundleId}`}>{bundleId}</Link></div>
          </div>

          <div className="item">
            <div className="label">Node</div>
            <div className="address">{node}</div>
          </div>

          <div className="item">
            <div className="label">Signature</div>
            <div className="address">{signature}</div>
          </div>

          <div className="item">
            <div className="label">Assets</div>
            <div className="address">{totalAssets}</div>
          </div>

          <div className="item">
            <div className="label">Events</div>
            <div className="address">{totalEvents}</div>
          </div>

          <div className="item">
            <div className="label">Size</div>
            <div className="address">{size / (1000 * 1000)} MB</div>
          </div>
        </div>
      </div>
    </div>}
  </React.Fragment>);
};

BundleUpload.propTypes = {
  data: PropTypes.object,
};

export default BundleUpload;
