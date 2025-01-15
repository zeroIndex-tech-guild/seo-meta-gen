import { z } from 'zod'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { ShowCurrentWebhookUrl } from './show-current-webhook-url'
import { useAddWebhookUrl } from '~/hooks/userApp/useAddWebhookUrl'
import { WebhookUrl } from '~/types/webhook'
import { DataTable } from '~/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { router, usePage } from '@inertiajs/react'
const urlSchema = z.string().url()

const columns: ColumnDef<WebhookUrl>[] = [
  {
    header: 'S.N.',
    cell: (props) => props.row.index + 1,
  },
  {
    accessorKey: 'url',
    header: 'URL',
  },
  {
    accessorKey: 'environment',
    header: 'Environment',
  },
]

export const AddWebHookURL = ({
  appId,
  webhookUrls,
}: {
  appId: string
  webhookUrls: WebhookUrl[]
}) => {
  const [currentWebhookUrls, setCurrentWebhookUrls] = useState<WebhookUrl[]>(webhookUrls)

  const [webhookUrl, setWebhookUrl] = useState({
    value: '',
    error: '',
  })

  const { url } = usePage()

  const { addWebhookUrl, isAddingWebhookUrl } = useAddWebhookUrl()

  const handleSaveWebhookUrl = (e: FormEvent) => {
    e.preventDefault()

    if (webhookUrl.value === '') {
      setWebhookUrl({
        value: '',
        error: 'Please enter a webhook url',
      })
      return
    }

    const isValidUrl = urlSchema.safeParse(webhookUrl.value).success

    if (!isValidUrl) {
      setWebhookUrl((prev) => ({
        ...prev,
        error: 'Please enter a valid webhook url',
      }))
      return
    }

    const data = {
      url: webhookUrl.value,
      appId,
    }

    addWebhookUrl(data, {
      onSuccess: (response) => {
        toast.success(response.message)
        setWebhookUrl({
          value: '',
          error: '',
        })

        router.visit(url, {
          only: ['app'],
        })
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  const onChange = (e: FormEvent) => {
    setWebhookUrl({
      value: (e.target as HTMLInputElement).value,
      error: '',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Webhook URL</CardTitle>
      </CardHeader>
      <CardContent>
        <ShowCurrentWebhookUrl />
        <form className="" onSubmit={handleSaveWebhookUrl}>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="https://yourdomain.com/webhook"
              value={webhookUrl.value}
              onChange={onChange}
            />
            <Button disabled={isAddingWebhookUrl} type="submit">
              Save
            </Button>
          </div>

          {webhookUrl.error && <p className="text-red-500 text-sm py-1">{webhookUrl.error}</p>}
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Enter the URL where you want to receive webhook events. (Include http:// or https://)
        </p>

        <DataTable data={currentWebhookUrls} columns={columns} />
      </CardContent>
    </Card>
  )
}
