import emitter from '@adonisjs/core/services/emitter'

emitter.on('user:registered', function (user) {
  console.log('trig')
  console.log(user)
})
