const User = require('../models/user').User;
const sendEmail = require('../action/sendEmail').sendEmail;
const moment = require('moment-timezone')
const { Op } = require('sequelize');
const sendBirtDayMsg = async () => {
  let currentTime = moment().format("DD-MM HH");
  console.log('running send email task at ', currentTime);
  //get data user that need to celebrate when the sendDate is same with current time or isFails is true and inQueue is false
  //send email
  //if error -> update isFails to true
  //if success -> update isFails to false
  try {
    let listId = []
    //get list user
    let listUser = await User.findAll({
      where: {
        inQueue: false,
        [Op.or]: [
          { sendDate: currentTime }, { isFails: true }
        ]
      }
    })
    //create list id
    for (let i = 0; i < listUser.length; i++) {
      listId.push(listUser[i].dataValues.id)
    }
    console.log("list Id : ", listId)
    //update related user set inQueue to True
    await User.update({
      inQueue: true
    }, {
      where: {
        id: listId
      }
    })
    console.log("list user :", listUser)
    for (let i = 0; i < listUser.length; i++) {

      let isSendEmail = await sendEmail(listUser[i].dataValues.email, `Hey, ${listUser[i].dataValues.firstName} ${listUser[i].dataValues.lastName} it’s your birthday`)
      console.log(`sent email to userid ${listId[i]} at ${currentTime} is ${isSendEmail ? 'succeed' : 'failed'}`)
      await User.update({
        isFails: !isSendEmail,
        inQueue: false,
      }, { where: { id: listUser[i].dataValues.id } })
    }
  } catch (error) {
    console.error(`job send email error ${currentTime}: `, error)
  }
}

module.exports.sendBirtDayMsg = sendBirtDayMsg