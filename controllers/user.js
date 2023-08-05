
const moment = require('moment-timezone')
const User = require('../models/user').User;
const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone

const createUser = async (req, res, validationResult) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    //great
    res.status(400)
    return res.send({ errors: result.array() });
  }
  let birthDate = req.body.birthDate
  let location = req.body.location

  // console.log(now.tz(location).format('ha z'))
  // console.log(now.tz(localZone).format('ha z'))
  // console.log(birthDate.toDateString("DD-MM-YYYY"))
  let remind = `${birthDate.split("T")[0]} 09:00:00.000`
  // console.log()
  // let mBirthDate = moment.tz(remind, location) // in user location
  let sBirthDate = moment.tz(remind, location).tz(localZone)

  // console.log(mBirthDate.format("DD-MM HH"))
  // console.log(sBirthDate.format("DD-MM HH"))
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      sendDate: sBirthDate.format("DD-MM HH"),
      birthDate: remind,
      location: location
    })
    res.status(200)
    res.send(
      { id: user.id }
    )
  } catch (er) {
    res.status(500)
    res.send(
      { error: er }
    )
  }
}

const updateUser = async (req, res, validationResult) => {
  const valResult = validationResult(req)

  if (!valResult.isEmpty()) {
    //great
    res.status(400)
    return res.send({ errors: valResult.array() });
  }
  let id = parseInt(req.params.id)
  if (isNaN(id) || id <= 0) {
    res.status(400)
    return res.send({ code: 'Id Not valid!' });
  }
  const user = await User.findByPk(id);
  if (user === null) {
    res.status(400)
    return res.send({ code: 'User Not found!' });
  }

  let birthDate = req.body.birthDate
  let location = req.body.location

  let remind = `${birthDate.split("T")[0]} 09:00:00.000`
  // let mBirthDate = moment.tz(remind, location) // in user location
  let sBirthDate = moment.tz(remind, location).tz(localZone)
  try {
    const result = await user.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        sendDate: sBirthDate.format("DD-MM HH"),
        birthDate: remind,
        location: location
      }
    )
    res.status(200)
    res.send({ code: "success", data: result })
  } catch (er) {
    res.status(500)
    res.send({ error: er })
  }
}

const deleteUser = async (req, res) => {
  let id = parseInt(req.params.id)
  if (!isNaN(id) && id > 0) {
    await User.destroy({ where: { id: id } })

    console.log(req.params.id)
    res.send({ code: "success" })
  } else {
    res.send({ code: "failed" })
  }
}

module.exports.createUser = createUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser