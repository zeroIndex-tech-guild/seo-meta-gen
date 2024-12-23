import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { AddWebHookURL } from './components/add-webhook-url'
import { GenerateNewKey } from './components/generate-key'
import { Table } from 'lucide-react'
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { useState } from 'react'
import { DashboardLayout } from '~/components/layouts/dashboard-layout'
import { UserAppName } from './components/user-app-name'

/*
 * When a new app is being created or existing app is being edited / viewed.
 * We will use this page :)
 *
 * URL: /webhook/apps/appId ['new' | 'id']
 * if appId === 'new'
 *  we will create a new app
 * if appID === 'id'
 *  we will view  / edit the app
 */
export default function CreateAppPage() {
  const [logs] = useState([
    { id: 1, status: 'Success', url: 'https://example.com/webhook', timestamp: '2024-06-17 12:00' },
    { id: 2, status: 'Failed', url: 'https://example.com/webhook', timestamp: '2024-06-17 11:45' },
  ])

  return (
    <div className="space-y-6 p-6">
      <UserAppName />

      <GenerateNewKey />

      <AddWebHookURL />

      {/* Webhook Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.status}</TableCell>
                  <TableCell>{log.url}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Helpful Information */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use Webhooks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4 space-y-2 text-sm">
            <li>Use the webhook key to authenticate requests.</li>
            <li>Provide a valid URL where you want to receive webhook events.</li>
            <li>
              Example payload:
              <pre className="bg-gray-100 p-2 rounded text-xs mt-1">
                {`{
  "jobId": "12345",
  "status": "completed",
  "tags": {
    "title": "Sample Title",
    "description": "Sample Description"
  }
}`}
              </pre>
            </li>
            <li>Ensure your endpoint returns a 2xx status code for successful delivery.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

CreateAppPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
