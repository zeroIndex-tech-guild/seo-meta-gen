import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { AxiosProvider } from '~/components/providers/axios_provider'
import { QueryProvider } from '~/components/providers/query-provider'

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
        <QueryProvider>
          <App {...props} />
        </QueryProvider>
      </AxiosProvider>
    ),
  })
}
