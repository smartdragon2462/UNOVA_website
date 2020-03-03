import React from 'react';

const numWithCommas = val => {
  return val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
};

const ambToUSD = (amb, usd_price) => {
  let result = amb * parseFloat(usd_price, 10);
  return result.toFixed(7);
};

const timestampToDate = timestamp => {
  return new Date(timestamp * 1000);
};

const timestampToUtc = timestamp => timestamp + new Date().getTimezoneOffset() * 60 * 1000;

const bundleExpirationTime = bundle => bundle.uploadTimestamp + (bundle.storagePeriods * 13 * 28 * 24 * 60 * 60);

export {
  bundleExpirationTime,
  ambToUSD,
  timestampToDate,
  timestampToUtc
};
