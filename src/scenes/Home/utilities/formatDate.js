const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function formatDate(timestamp, showDate = false, showTime = true) {
  const date = new Date(timestamp * 1000);

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  if (showDate && !showTime) {
    return `${month+1}/${day}/${year}`;
  }
  return `${showDate ? `${dayName}, ${day} ${months[month]} ${year} ` : ''}${hours}:${minutes}:${seconds}`;

}
