const { v4: uuidv4 } = require('uuid');

// Function to generate UUID
const generateUUID = () => {
    return uuidv4();
};

module.exports = {
    generateUUID
};
