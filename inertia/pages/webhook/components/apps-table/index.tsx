import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '~/components/ui/data-table'

const columns: ColumnDef<{ id: string; name: string }>[] = [
  {
    id: 'id',
    header: 'ID',
    accessorKey: 'id',
  },
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
  },
]

export const AppsTable = () => {
  return <DataTable columns={columns} data={[{ id: '1', name: 'My App' }]} />
}
