
const database = require('./config/database').database;
const User = require('./models/user').User;
require('dotenv').config()
const express = require('express')
const cron = require('node-cron');
const routes = require('./routes').routes;
const sendBirtDayMsg = require('./jobs/sendBirtDayMsg').sendBirtDayMsg
const app = express()
const port = process.env.port || 3000

function initCron() {
  cron.schedule('* 0 * * * *', async () => {
    await sendBirtDayMsg()
  });
  console.log("success init cron")
}
async function connectDB() {
  try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
    await User.sync({ alter: true })
    return true; //success
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false; //faile
  }
}
let isConnect = connectDB()
if (!isConnect) {
  return
}
initCron()
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
routes(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


