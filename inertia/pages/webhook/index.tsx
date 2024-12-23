import { DashboardLayout } from '~/components/layouts/dashboard-layout'
import { AppsTable } from './components/apps-table'
import { CreateNewAppModal } from './components/create-new-app-modal'
import { useState } from 'react'

export default function WebhookPage() {
  const [showCreateNewAppModal, setShowCreateNewAppModal] = useState(false)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Apps</h1>

      <CreateNewAppModal
        showModal={showCreateNewAppModal}
        setShowModal={setShowCreateNewAppModal}
      />
      <AppsTable />
    </div>
  )
}

WebhookPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
