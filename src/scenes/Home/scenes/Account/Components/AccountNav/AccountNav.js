import React from "react";
import PropTypes from "prop-types";
import "./AccountNav.scss";
import { ambToUSD } from "../../../../utilities/helpers";
import iconAccount from "../../../../assets/icons/account.svg";
import iconSmartContract from "../../../../assets/icons/contract_call_gradient.svg";
import {  ComponentLogo,  WaitingValue,  StringEllipsis} from "../../../../components";

import { CopyToClipboard } from "react-copy-to-clipboard";
import iconCopy from "../../../../assets/icons/copy-icon.svg";
import { Currency } from "@ambrosus/react";
// import QRCode from 'qrcode.react';

const AccountNav = props => {
  const { account = {} } = props;
  const { balance = 0, isContract } = account;

  return (
    <div className="AccountNav sub-header">
      <div className="wrapper_nav">
        <aside className="decoration">
          <ComponentLogo icon={isContract ? iconSmartContract : iconAccount} />
        </aside>

        <section>
          <div className="info">
            <h1 className="title">
              {isContract ? (
                <>
                  <span>Smart Contract</span> Details
                </>
              ) : (
                "Address Details"
              )}
            </h1>

            <div className="stats">
              <div className="point address">
                <div className="key">Address</div>
                <h4 className="value">
                  <WaitingValue
                    value={
                      account.address ? (
                        <StringEllipsis string={account.address} />
                      ) : null
                    }
                  />
                  {account.address && (
                    <CopyToClipboard text={account.address}>
                      <img wrapper_nav="span"  className="clipboard"  src={iconCopy}  />
                    </CopyToClipboard>
                  )}
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

AccountNav.propTypes = {
  account: PropTypes.object
};

export default AccountNav;
