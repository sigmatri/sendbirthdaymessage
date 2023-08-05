
const baseUrl = require('./baseUrl').baseUrl
const axios = require('axios')
const sendEmail = async (email, msg) => {
  try {
    let res = await axios.post(`${baseUrl}/send-email`, {
      "email": email,
      "message": msg
    })
    return true;
  } catch (er) {
    console.error(er)
    return false;
  }
}
module.exports.sendEmail = sendEmail