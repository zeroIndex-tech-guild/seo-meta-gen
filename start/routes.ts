/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth')
const MetagenController = () => import('#controllers/meta-gen')
const DashboardController = () => import('#controllers/dashboard')

router.on('/').renderInertia('home')

/*
 * Views Routes
 */

router.group(() => {
  router.get('/login', [AuthController, 'renderLoginPage']).as('login')
  router.get('/signup', [AuthController, 'renderSignupPage']).as('signup')

  router
    .group(() => {
      router.get('/dashboard', [DashboardController, 'renderDashboardPage']).as('dashboard')

      router.get('/metagen', [MetagenController, 'renderMetagenPage']).as('metagen')
    })
    .as('dashboard')
    .use(
      middleware.auth({
        guards: ['web'],
      })
    )
})

/*
 * API Routes
 */
router
  .group(() => {
    router
      .group(() => {
        router.post('/login', [AuthController, 'login']).as('login')
        router.post('/signup', [AuthController, 'signup']).as('signup')
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.post('', [MetagenController, 'generateTag']).as('generateTag')
      })
      .prefix('metagen')
      .as('metagen')
      .middleware(middleware.auth({ guards: ['api'] }))
  })
  .prefix('/api/v1')
  .as('meta-gen-api-v1')
