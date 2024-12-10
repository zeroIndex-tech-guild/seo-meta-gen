import { DashboardLayout } from '~/components/layouts/dashboard-layout'

export default function DashboardPage() {
  return <div>Dashboard</div>
}

DashboardPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
