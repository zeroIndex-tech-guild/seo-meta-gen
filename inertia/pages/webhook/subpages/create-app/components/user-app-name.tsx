import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'

type Props = {
  appName: string
}

export const UserAppName = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User App Name</CardTitle>
      </CardHeader>

      <CardContent>
        <Input value={'heheCat'} readOnly disabled={true} />
      </CardContent>
    </Card>
  )
}
