
const moment = require('moment');

function formatMessage(username, text, isSender) {
  return {
    username,
    text,
    time: moment().format('h:mm a'),
    isSender,
  };
}

module.exports = formatMessage;
