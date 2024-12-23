import { router } from '@inertiajs/react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { DataTable } from '~/components/ui/data-table'
import { UserApp } from '~/types/user-app'

const columns: ColumnDef<UserApp>[] = [
  {
    header: 'S.N.',
    cell: ({ row }) => row.index + 1,
  },
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
  },
]

type Props = {
  data: UserApp[]
}

export const AppsTable = (props: Props) => {
  const { data } = props

  const onRowClick = (data: Row<UserApp>) => {
    router.get(`/webhook/apps/${data.original.id}`)
  }

  return <DataTable columns={columns} data={data} onRowClick={onRowClick} />
}
