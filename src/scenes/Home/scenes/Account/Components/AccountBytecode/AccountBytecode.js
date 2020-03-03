import React from 'react';
import PropTypes from 'prop-types';
import { ShowMore } from '../../../../components';
import './AccountBytecode.scss';
import iconBytecode from '../../../../assets/icons/bytecode.svg';

const AccountBytecode = props => {
  return props.account.isContract && props.account.byteCode ? (
    <div className='AccountBytecode'>
      <div className='wrapper'>
        <aside className='decoration'>
          <img src={iconBytecode} />
        </aside>
        <section>
          <div className='keyValue'>
            <div className='key'>Byte code</div>
            <ShowMore data={props.account.byteCode} />
          </div>
        </section>
      </div>
    </div>
  ) : null;
};

AccountBytecode.propTypes = {
  account: PropTypes.object,
};

export default AccountBytecode;
