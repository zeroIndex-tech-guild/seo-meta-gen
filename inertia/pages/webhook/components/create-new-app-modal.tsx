import { router } from '@inertiajs/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { useCreateUserApp } from '~/hooks/userApp/useCreateUserApp'

type Props = {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}
export const CreateNewAppModal = (props: Props) => {
  const { showModal, setShowModal } = props
  const [appName, setAppName] = useState({
    value: '',
    error: '',
  })
  const { createUserApp, isCreatingUserApp } = useCreateUserApp()

  const onAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName((prev) => ({
      ...prev,
      value: e.target.value,
    }))
  }

  const onCreateApp = (e: React.FormEvent) => {
    e.preventDefault()

    if (!appName.value) {
      setAppName((prev) => ({
        ...prev,
        error: 'App name is required',
      }))
      return
    }

    createUserApp(
      { name: appName.value },
      {
        onSuccess: (responseData) => {
          toast.success(responseData.message)
          router.get('/webhook/apps/' + responseData.data.id)
        },
      }
    )
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button>Create a new app</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new app</DialogTitle>
          <DialogDescription>
            Create a new app and start configuring your webhook.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onCreateApp}>
          <div className="mb-4">
            <Input placeholder="App name" value={appName.value} onChange={onAppNameChange} />

            {appName.error && <p className="text-red-500">{appName.error}</p>}
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button type="submit">Create App</Button>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
