import { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  renderDashboardPage({ inertia, auth }: HttpContext) {
    return inertia.render(
      'dashboard/index/index',
      {},
      {
        title: 'Metagen - Dashboard',
        description: 'Dashboard for Metagen',
      }
    )
  }
}