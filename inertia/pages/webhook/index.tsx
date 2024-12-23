import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { DashboardLayout } from '~/components/layouts/dashboard-layout'
import { GenerateNewKey } from './components/generate-key'
import { AddWebHookURL } from './components/add-webhook-url'
import { Button } from '~/components/ui/button'

export default function WebhookPage() {
  const [logs] = useState([
    { id: 1, status: 'Success', url: 'https://example.com/webhook', timestamp: '2024-06-17 12:00' },
    { id: 2, status: 'Failed', url: 'https://example.com/webhook', timestamp: '2024-06-17 11:45' },
  ])

  const [apps, setApps] = useState([
    { id: 1, name: 'My App', description: 'SEO Generator', webhookUrl: '' },
  ])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Apps</h1>
      <Button
        onClick={() => {
          /* Navigate to Create App Page */
        }}
      >
        Create App
      </Button>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.description}</td>
              <td>
                <Button
                  onClick={() => {
                    /* Navigate to Edit App Page */
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    /* Delete App */
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
  return (
    <div className="space-y-6 p-6">
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

WebhookPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
