import { CodeXml, Gauge, Webhook } from 'lucide-react'

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
      {
        title: 'Web hook',
        url: '/webhook',
        Icon: Webhook,
      },
    ],
  },
]
