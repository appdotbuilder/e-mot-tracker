import * as React from "react"

interface SidebarContextType {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextType | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

interface SidebarProviderProps {
  defaultOpen?: boolean
  children: React.ReactNode
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  SidebarProviderProps
>(({ defaultOpen = true, children }, ref) => {
  const [open, setOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isMobile] = React.useState(false)

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open)
  }, [isMobile])

  const state = open ? 'expanded' : 'collapsed'

  const contextValue = React.useMemo<SidebarContextType>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div ref={ref}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: 'icon' | 'none';
  variant?: 'inset' | 'floating' | 'sidebar';
}

const Sidebar = React.forwardRef<
  HTMLDivElement,
  SidebarProps
>(({ children, collapsible, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground"
      data-collapsible={collapsible}
      data-variant={variant}
      {...props}
    >
      {children}
    </div>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className="flex flex-1 flex-col" {...props}>
      {children}
    </div>
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  return (
    <button
      ref={ref}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
      {...props}
    />
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className="flex flex-1 flex-col gap-2 p-2" {...props}>
      {children}
    </div>
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className="flex items-center gap-2 px-2 py-2" {...props}>
      {children}
    </div>
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className="flex items-center gap-2 px-2 py-2" {...props}>
      {children}
    </div>
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ children, ...props }, ref) => {
  return (
    <ul ref={ref} className="flex flex-col gap-1" {...props}>
      {children}
    </ul>
  )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ children, ...props }, ref) => {
  return (
    <li ref={ref} {...props}>
      {children}
    </li>
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: {
    children: string;
  };
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ children, asChild, ...props }, ref) => {
  if (asChild) {
    return <>{children}</>
  }
  
  return (
    <button
      ref={ref}
      className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className="relative flex w-full min-w-0 flex-col" {...props}>
      {children}
    </div>
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2"
      {...props}
    >
      {children}
    </div>
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
})
SidebarGroupContent.displayName = "SidebarGroupContent"

export {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
}