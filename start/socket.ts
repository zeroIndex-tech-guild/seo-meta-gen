import app from '@adonisjs/core/services/app'
import SocketIO from '#services/socket'

app.ready(() => {
  SocketIO.boot()
})
