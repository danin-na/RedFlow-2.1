import * as react from "react"
import * as radix from "@radix-ui/react-tabs"

type RootProps = react.ComponentProps<typeof radix.Root>
type ListProps = react.ComponentProps<typeof radix.List>
type TriggerProps = react.ComponentProps<typeof radix.Trigger>
type ContentProps = react.ComponentProps<typeof radix.Content>

function Root({ className, ...props }: RootProps)
{
  return (
    <radix.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}
function List({ className, ...props }: ListProps)
{
  return (
    <radix.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}
function Trigger({ className, ...props }: TriggerProps)
{
  return (
    <radix.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}
function Content({ className, ...props }: ContentProps)
{
  return (
    <radix.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export const Tab = { Root, List, Trigger, Content }
