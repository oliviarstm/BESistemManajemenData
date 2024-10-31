const dayjs = require("dayjs");
const dateConvert = (theString) => dayjs(theString).format("YYYY-MM-DD");

module.exports = {
    dateConvert
}