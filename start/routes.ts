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
const WebhookController = () => import('#controllers/webhook')
const UserAppController = () => import('#controllers/user-app')

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

      router.get('/webhook', [WebhookController, 'renderWebhookPage']).as('webhook')

      router
        .get('/webhook/apps/:appId', [UserAppController, 'renderCreateAppPage'])
        .as('webhook.app')
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

    router
      .group(() => {
        router
          .group(() => {
            router.post('', [UserAppController, 'createUserApp']).as('webhook.secret.create')
          })
          .prefix('user-apps')
          .as('user-apps')
        //router
        //  .post('/secrets', [WebhookController, 'generateSecretKey'])
        //  .as('webhook.secret.create')
        //
        //router.get('/secrets', [WebhookController, 'getCurrentSecretKey']).as('webhook.secret.get')
        //
        //router.post('/urls', [WebhookController, 'addWebhookUrl']).as('webhook.url.add')
        //
        //router.get('/urls', [WebhookController, 'getCurrentWebhookUrl']).as('webhook.url.get')
      })
      .prefix('webhooks')
      .as('webhooks')
      .middleware(middleware.auth({ guards: ['api'] }))

    router
      .group(() => {
        router
          .post('/metas/generate', [MetagenController, 'generateTagForAPI'])
          .as('metagen.generate')
      })
      .middleware(middleware.webhookApiAuth())
  })
  .prefix('/api/v1')
  .as('meta-gen-api-v1')
