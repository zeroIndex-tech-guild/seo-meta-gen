import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DashboardLayout } from '~/components/layouts/dashboard-layout'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { useGenerateMeta } from '~/hooks/metagen/useGenerateMeta'
import { useSocket } from '~/store/context/socket'
import { generateSeoTags } from '~/lib/utils'
import { Meta } from '#sharedtypes'
import { HTMLCode } from './components/html-code'

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
        toast.success(response.message)
      },
    })
  }

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const isEmpty = value === ''
    setFormState({ error: isEmpty ? 'Content is required' : '', content: e.target.value })
  }

  return (
    <div>
      <h2>MetaGen</h2>

      <form onSubmit={onSubmit}>
        <Label>Content</Label>
        <Textarea rows={30} value={formState.content} onChange={onContentChange} className="mb-4" />
        {formState.error && <p className="text-red-500">{formState.error}</p>}
        <Button type="submit" disabled={isGeneratingMeta}>
          Generate
        </Button>

        <div>{metaTags && <HTMLCode code={generateSeoTags(metaTags)} />}</div>
      </form>
    </div>
  )
}

MetaGen.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
