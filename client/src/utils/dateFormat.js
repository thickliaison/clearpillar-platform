const moment = require('moment-timezone');

function formatDateToTimeZone(utcDate) {
    return moment(utcDate).tz('America/New_York').format('MMM DD YYYY, h:mm A');
}
export default formatDateToTimeZone;
