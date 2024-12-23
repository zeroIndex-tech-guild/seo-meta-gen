import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useGenerateSecretKey } from '~/hooks/webhook/useGenerateSecretKey'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { ClipboardCopyIcon, RefreshCw } from 'lucide-react'
import { useGetCurrentSecretKey } from '~/hooks/webhook/useGetCurrentSecretKey'
import { hideKey } from '~/lib/utils'

export const GenerateNewKey = () => {
  const { generateSecretKey } = useGenerateSecretKey()
  const { currentSecretKey } = useGetCurrentSecretKey()

  const [webhookKey, setWebhookKey] = useState({
    hidden: 'zeroIndex_**********',
    full: '',
  })

  const secretKey = currentSecretKey?.data?.secretKey
  useEffect(() => {
    if (!secretKey) return

    const hiddenKey = hideKey(secretKey)

    setWebhookKey({ hidden: hiddenKey, full: secretKey })
  }, [secretKey])

  const generateNewKey = async () => {
    await generateSecretKey(null, {
      onSuccess: (response) => {
        const secretKey = response.data?.secretKey
        const hiddenKey = hideKey(secretKey)
        setWebhookKey((prev) => ({ ...prev, hidden: hiddenKey, full: response.data.secretKey }))
        toast.success(response.message)
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  const onClipboardCopy = () => {
    navigator.clipboard.writeText(webhookKey.full)
    toast.success('Webhook URL copied to clipboard')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhook Key</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="text-sm font-mono bg-gray-100 p-2 rounded">{webhookKey.hidden}</div>
        <div className="flex gap-2">
          <Button size="icon" variant="outline" onClick={onClipboardCopy}>
            <ClipboardCopyIcon className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={generateNewKey}>
            <RefreshCw className="w-4 h-4 mr-2" /> Generate New Key
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
