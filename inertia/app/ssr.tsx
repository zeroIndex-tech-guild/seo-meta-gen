import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { AxiosProvider } from '~/components/providers/axios-provider'
import { QueryProvider } from '~/components/providers/query-provider'
import { Toaster } from 'sonner'
import { SocketProvider } from '~/components/providers/socket-provider'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      return pages[`../pages/${name}.tsx`]
    },
    setup: ({ App, props }) => (
      <AxiosProvider>
        <SocketProvider>
          <QueryProvider>
            <Toaster />
            <App {...props} />
          </QueryProvider>
        </SocketProvider>
      </AxiosProvider>
    ),
  })
}
