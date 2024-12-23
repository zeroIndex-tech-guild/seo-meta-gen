import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'

type Props = {
  appName: string
}

export const UserAppName = (props: Props) => {
  const { appName } = props
  return (
    <Card>
      <CardHeader>
        <CardTitle>User App Name</CardTitle>
      </CardHeader>

      <CardContent>
        <Input value={appName} readOnly disabled={true} />
      </CardContent>
    </Card>
  )
}
