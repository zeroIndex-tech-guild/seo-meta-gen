import { useGetCurrentWebhook } from '~/hooks/webhook/useGetCurrentWebhook'

export const ShowCurrentWebhookUrl = () => {
  //const currentUrl = currentWebhookUrl?.data?.url
  //
  //if (isFetchingCurrentWebhook) {
  //  return <p className="text-sm text-gray-500 mb-4">Loading current webhook URL...</p>
  //}

  const currentUrl = 'ok'
  if (currentUrl) {
    return (
      <div className="mb-4 flex gap-2">
        <p className="text-sm text-gray-700">Current Webhook URL:</p>
        <a className="text-sm text-blue-600 hover:underline" href={currentUrl}>
          {currentUrl}
        </a>
      </div>
    )
  }

  return <p className="text-sm text-gray-500 mb-4">No webhook URL is configured.</p>
}
