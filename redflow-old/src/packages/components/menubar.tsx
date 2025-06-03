import { ComponentProps } from "react"
import { Root, Menu, Group, Portal, RadioGroup, RadioItem, Trigger, Content, Item, CheckboxItem, Label, Separator, Sub, SubTrigger, SubContent, ItemIndicator } from "@radix-ui/react-menubar"
import { cn } from '@redflow/utils'
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

type Root = ComponentProps<typeof Root>
type Menu = ComponentProps<typeof Menu>
type MenuTrigger = ComponentProps<typeof Trigger>
type MenuContent = ComponentProps<typeof Content>
type Sub = ComponentProps<typeof Sub>
type SubTrigger = ComponentProps<typeof SubTrigger> & { inset?: boolean }
type SubContent = ComponentProps<typeof SubContent>
type Group = ComponentProps<typeof Group>
type Portal = ComponentProps<typeof Portal>
type Item = ComponentProps<typeof Item> & { inset?: boolean; variant?: "default" | "destructive" }
type Check = ComponentProps<typeof CheckboxItem>
type Radios = ComponentProps<typeof RadioGroup>
type Radio = ComponentProps<typeof RadioItem>
type Label = ComponentProps<typeof Label> & { inset?: boolean }
type Separator = ComponentProps<typeof Separator>
type Info = ComponentProps<"span">

function root({ className, ...props }: Root)
{
  return (
    <Root
      data-slot="menubar"
      className={cn("bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs", className)}
      {...props}
    />
  )
}
function menu({ ...props }: Menu)
{
  return <Menu data-slot="menubar-menu" {...props} />
}
function group({ ...props }: Group)
{
  return <Group data-slot="menubar-group" {...props} />
}
function portal({ ...props }: Portal)
{
  return <Portal data-slot="menubar-portal" {...props} />
}
function radios({ ...props }: Radios)
{
  return (
    <RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}
function menuTrigger({ className, ...props }: MenuTrigger)
{
  return (
    <Trigger
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className
      )}
      {...props}
    />
  )
}
function menuContent({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }: MenuContent)
{
  return (
    <Portal>
      <Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </Portal>
  )
}
function item({ className, inset, variant = "default", ...props }: Item)
{
  return (
    <Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}
function check({ className, children, checked, ...props }: Check)
{
  return (
    <CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ItemIndicator>
          <CheckIcon className="size-4" />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  )
}
function radio({ className, children, ...props }: Radio)
{
  return (
    <RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  )
}
function label({ className, inset, ...props }: Label)
{
  return (
    <Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}
function separator({ className, ...props }: Separator)
{
  return (
    <Separator
      data-slot="menubar-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}
function info({ className, ...props }: Info)
{
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}
function sub({ ...props }: Sub)
{
  return <Sub data-slot="menubar-sub" {...props} />
}
function subTrigger({ className, inset, children, ...props }: SubTrigger)
{
  return (
    <SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </SubTrigger>
  )
}
function subContent({ className, ...props }: SubContent)
{
  return (
    <SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export const Menubar =
{
  root,
  portal,
  menu,
  menuTrigger,
  menuContent,
  separator,
  label,
  item,
  info,
  check,
  radios,
  radio,
  sub,
  subTrigger,
  subContent,
}
