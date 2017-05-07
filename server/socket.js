let io = null
import log4js from 'log4js'
const logger = log4js.getLogger()

export function initSocketHandler (server) {
  io = require('socket.io')(server)
  io.on('connection', function (socket) {
    logger.info(socket.id, 'a socket has connected')
  })
}
