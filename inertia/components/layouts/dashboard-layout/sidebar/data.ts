import { CodeXml, Gauge } from 'lucide-react'

export const dashboardSidebarItems = [
  {
    label: 'ViewPoints',
    points: [
      {
        title: 'Dashboard',
        url: '/',
        Icon: Gauge,
      },
      {
        title: 'MetaGen',
        url: '/metagen',
        Icon: CodeXml,
      },
    ],
  },
]
