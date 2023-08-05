const createUser = require('./controllers/user').createUser;
const deleteUser = require('./controllers/user').deleteUser;
const updateUser = require('./controllers/user').updateUser;
const moment = require('moment-timezone')
const { ExpressValidator } = require('express-validator')
const { body, validationResult } = new ExpressValidator({
  isLocation: async value => {
    if (!moment.tz.zone(value)) {
      throw new Error("location is Not Valid")
    }
  }
})
const routes = (app) => {
  app.post('/user',
    body(["firstName", "lastName", "email", "birthDate", "location"]).notEmpty().trim(),
    // body("birthDate").isDate({ format: "YYYY-MM-DDTHH:mm:ss.sssZ" }),
    body("email").isEmail(),
    body("location").isLocation(), async (req, res) => {
      await createUser(req, res, validationResult)
    }

  )

  app.delete('/user/:id', deleteUser)

  app.put('/user/:id',
    body(["firstName", "lastName", "email", "birthDate", "location"]).notEmpty().trim(),
    // body("birthDate").isDate({ format: "YYYY-MM-DDTHH:mm:ss.sssZ" }),
    body("email").isEmail(),
    body("location").isLocation(),
    async (req, res) => {
      await updateUser(req, res, validationResult)
    }
  )
};

module.exports.routes = routes;