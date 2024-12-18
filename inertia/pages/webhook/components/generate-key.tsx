import { useState } from 'react'
import { toast } from 'sonner'
import { useGenerateSecretKey } from '~/hooks/webhook/useGenerateSecretKey'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { ClipboardCopyIcon, RefreshCw } from 'lucide-react'

export const GenerateNewKey = () => {
  const { generateSecretKey } = useGenerateSecretKey()
  const [webhookKey, setWebhookKey] = useState({
    hidden: 'zeroIndex_**********',
    full: '',
  })

  const generateNewKey = async () => {
    await generateSecretKey(null, {
      onSuccess: (response) => {
        const secretKey = response.data.secretKey
        const hiddenKey = hideKey(secretKey)
        setWebhookKey((prev) => ({ ...prev, hidden: hiddenKey, full: response.data.secretKey }))
        toast.success(response.message)
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  const hideKey = (key: string) => {
    const length = key.length
    const hiddenKey = key.substring(0, 3) + '************' + key.substring(length - 3, length)
    return hiddenKey
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
