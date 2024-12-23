import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { useAddWebhookUrl } from '~/hooks/webhook/useAddWebhookUrl'
import { ShowCurrentWebhookUrl } from './show-current-webhook-url'
import { queryClient } from '~/components/providers/query-provider'

export const AddWebHookURL = () => {
  const [webhookUrl, setWebhookUrl] = useState('')
  const { addWebhookUrl, isAddingWebhookUrl } = useAddWebhookUrl()

  const handleSaveWebhookUrl = (e: FormEvent) => {
    e.preventDefault()

    addWebhookUrl(webhookUrl, {
      onSuccess: (response) => {
        toast.success(response.message)
        setWebhookUrl('')
        queryClient.invalidateQueries({
          queryKey: ['currentWebhook'],
        })
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Webhook URL</CardTitle>
      </CardHeader>
      <CardContent>
        <ShowCurrentWebhookUrl />
        <form className="flex gap-2" onSubmit={handleSaveWebhookUrl}>
          <Input
            type="url"
            placeholder="https://yourdomain.com/webhook"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <Button disabled={isAddingWebhookUrl} type="submit">
            Save
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Enter the URL where you want to receive webhook events.
        </p>
      </CardContent>
    </Card>
  )
}
