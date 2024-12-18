import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DashboardLayout } from '~/components/layouts/dashboard-layout'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { useGenerateMeta } from '~/hooks/metagen/useGenerateMeta'
import { useSocket } from '~/store/context/socket'
import { generateSeoTags } from '~/lib/utils'
import { Meta } from '#sharedtypes'
import { HTMLCode } from './components/html-code'
import { Loader2 } from 'lucide-react'

export default function MetaGen() {
  const [formState, setFormState] = useState({
    content: '',
    error: '',
  })
  const [metaTags, setMetaTags] = useState<Meta>()
  const { generateMeta, isGeneratingMeta } = useGenerateMeta()
  const io = useSocket()

  useEffect(() => {
    io?.on('meta-job-completed', (jobData: any) => {
      console.log('Job completed:', jobData)
      setMetaTags(jobData.data.metaTags)
      toast.success('Meta tags generated successfully!')
    })

    return () => {
      io?.off('meta-job-completed')
    }
  }, [io])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isEmpty = formState.content === ''
    if (isEmpty) {
      setFormState({ ...formState, error: 'Content is required' })
      toast.error('Content is required to generate meta tags.')
      return
    }

    generateMeta(formState.content, {
      onError: (error) => {
        toast.error(error.message)
      },

      onSuccess: (response) => {
        toast.info(response.message)
      },
    })
  }

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const isEmpty = value === ''
    setFormState({ error: isEmpty ? 'Content is required' : '', content: value })
  }

  return (
    <div className="p-6 space-y-8">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-center">Meta Tag Generator</h2>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={8}
                value={formState.content}
                onChange={onContentChange}
                placeholder="Enter the content to generate meta tags..."
                className="mt-2"
              />
              {formState.error && <p className="text-sm text-red-500 mt-1">{formState.error}</p>}
            </div>
            <Button type="submit" disabled={isGeneratingMeta} className="w-full">
              {isGeneratingMeta && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isGeneratingMeta ? 'Generating...' : 'Generate Meta Tags'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Generated Meta Tags */}
      {metaTags && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Meta Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 bg-gray-900 text-white overflow-auto max-h-96">
              <HTMLCode code={generateSeoTags(metaTags)} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

MetaGen.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
