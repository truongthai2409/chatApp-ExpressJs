// const formatTime = require('date-format');

// const createMessages = (messageText) => {
//     return {
//         messageText,
//         createDate: formatTime('dd/MM/yyy - hh:mm:ss', new Date())
//     }
// };

// module.exports = createMessages;

const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
