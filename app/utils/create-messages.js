const formatTime = require('date-format');

const createMessages = (messageText) => {
    return {
        messageText,
        createDate: formatTime('dd/MM/yyy - hh:mm:ss', new Date())
    }
};

module.exports = createMessages;