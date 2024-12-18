import redis from '@adonisjs/redis/services/main'

export const connection = redis.connection('main')
