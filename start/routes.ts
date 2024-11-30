/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth')

router.on('/').renderInertia('home')

router
  .group(() => {
    router
      .group(() => {
        router.post('/login', [AuthController, 'login']).as('login')
        router.post('/signup', [AuthController, 'signup']).as('signup')
      })
      .prefix('auth')
      .as('auth')
  })
  .prefix('/api/v1')
  .as('meta-gen-api-v1')
