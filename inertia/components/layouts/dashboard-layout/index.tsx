import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { DashboardSidebar } from './sidebar'

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="container mx-auto p-12 flex-1 flex flex-col gap-6 relative">
        <SidebarTrigger className="absolute top-4 -left-4 z-[1000]" />

        {children}
      </div>
    </SidebarProvider>
  )
}
