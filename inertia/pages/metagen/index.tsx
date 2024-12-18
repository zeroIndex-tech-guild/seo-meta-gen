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
import { Meta } from '#sharedTypes/meta'
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
      <h2 className="text-3xl font-bold text-center">Meta Tag Generator</h2>

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
                rows={25}
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
      {isGeneratingMeta && <Loader2 className="w-8 h-8 mx-auto animate-spin" />}
      {metaTags && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Meta Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <HTMLCode code={generateSeoTags(metaTags)} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

MetaGen.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
