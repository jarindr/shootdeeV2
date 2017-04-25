const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/shootdee'
function connect () {
  mongoose.connect(url, function (err) {
    if (err) throw err
    console.log('mongodb database connection intialized.')
  })
}
module.exports = {
  connect
}
