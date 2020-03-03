import moment from 'moment';

/**
 * Convert timestamp number to moment unix
 * @param timestamp
 */
const timestampToUnix = (timestamp) => moment.utc(moment.unix(timestamp));

/**
 * Get current unix timestamp
 */
export const getNow = () => moment.utc().unix();

/**
 * Get current unix timestamp
 */
export const getNowDate = () => moment.utc().format('YYYY-MM-DD HH:mm:ss');

/**
 * Get today
 */
export const getToday = () => getDayStart(getDayOffset(0));

/**
 * Get tomorrow
 */
export const getTomorrow = () => getDayStart(getDayOffset(1));

/**
 * Get yesterday
 */
export const getYesterday = () => getDayStart(getDayOffset(-1));

/**
 * start of day
 */
export const getDayStart = (timestamp) => timestampToUnix(timestamp)
  .startOf('day')
  .unix();

/**
 * end of day
 */
export const getDayEnd = (timestamp) => timestampToUnix(timestamp)
  .endOf('day')
  .unix();

/**
 * current timestamp - 24 hours
 */
export const getDayAgo = () => timestampToUnix(getNow())
  .add(-1, 'day')
  .unix();

/**
 * Get days offset
 * @param days
 * @param fromTimestamp
 */
export const getDayOffset = (days, fromTimestamp = getNow()) => timestampToUnix(fromTimestamp)
  .add(days, 'day')
  .unix();

/**
 * Get seconds offset
 * @param days
 * @param fromTimestamp
 */
export const getSecondOffset = (seconds, fromTimestamp = getNow()) => timestampToUnix(fromTimestamp)
  .add(seconds, 'seconds')
  .unix();
