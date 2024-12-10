import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar'
import { dashboardSidebarItems } from './data'
import { Link, usePage } from '@inertiajs/react'
import { cn } from '~/lib/utils'
import { Bot } from 'lucide-react'

export const DashboardSidebar = () => {
  const { url: pageUrl } = usePage()

  return (
    <Sidebar collapsible="icon">
      <SidebarMenuButton asChild>
        <Link
          href={'/'}
          className={cn('flex items-center gap-2 text-md hover:bg-purple-800  p-2 rounded-md')}
        >
          <Bot size={164} />
          <span>Neploar</span>
        </Link>
      </SidebarMenuButton>

      <SidebarContent>
        {dashboardSidebarItems.map((sidebarItem) => {
          const { label, points } = sidebarItem

          return (
            <SidebarGroup key={label}>
              <SidebarGroupLabel className="text-base">{label}</SidebarGroupLabel>

              <SidebarContent>
                <SidebarMenu>
                  {points.map((point) => {
                    const { url, title, Icon } = point
                    const isActive = url === pageUrl
                    return (
                      <SidebarMenuItem key={url}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link
                            href={url}
                            className={cn(
                              'flex items-center gap-2 text-md hover:bg-purple-800  p-2 rounded-md',
                              isActive && 'bg-purple-800'
                            )}
                          >
                            {<Icon size={16} />}
                            <span>{title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>

      <SidebarFooter>Settings</SidebarFooter>
    </Sidebar>
  )
}
