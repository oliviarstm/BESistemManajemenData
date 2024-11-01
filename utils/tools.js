const dayjs = require("dayjs");
const path = require("path");
const dateConvert = (theString) => dayjs(theString).format("YYYY-MM-DD");
const privateDir =()=>path.join(__dirname, "../upload")


module.exports = {
    dateConvert,
    privateDir,
}