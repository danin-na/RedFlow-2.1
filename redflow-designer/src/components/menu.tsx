import React from 'react'
import { ui } from 'redflow'
const { Menu: m } = ui

type RN = React.ReactNode
type MenuProps<K extends keyof typeof m> = React.ComponentProps<typeof m[K]>
export interface MenuData { trigger: string, items: MenuItem[] }
export interface MenubarDemoProps { config: MenuData[] }

export type MenuItem =
  | { type: 'label', props?: MenuProps<'label'>, children?: RN, }
  | { type: 'item', props?: MenuProps<'item'>, children?: RN, info?: string, }
  | { type: 'check', props?: MenuProps<'check'>, children?: RN, info?: string, }
  | { type: 'menu', props?: MenuProps<'sub'>, children?: RN, items: MenuItem[], info?: string, }
  | { type: 'radio', props?: MenuProps<'radios'>, value: string, items: { value: string, children?: RN, info?: string, }[], }
  | { type: 'break', props?: MenuProps<'break'> }

function renderMenuItem(i: MenuItem, k: React.Key): RN {
  switch (i.type) {
    case 'break': return (
      <m.break key={k} {...i.props} />
    )
    case 'label': return (
      <m.label key={k} {...i.props}>{i.children}</m.label>
    )
    case 'item': return (
      <m.item key={k} {...i.props}> {i.children} {i.info && <m.info>{i.info}</m.info>} </m.item>
    )
    case 'check': return (
      <m.check key={k} {...i.props}> {i.children} {i.info && <m.info>{i.info}</m.info>} </m.check>
    )
    case 'menu': return (
      <m.sub key={k} {...i.props}> <m.subTrigger> {i.children} {i.info && <m.info>{i.info}</m.info>}</m.subTrigger>
        <m.subContent> {i.items.map((subItem, idx) => renderMenuItem(subItem, idx))} </m.subContent>
      </m.sub>
    )
    case 'radio': return (
      <m.radios key={k} value={i.value} {...i.props}>
        {i.items.map((opt, idx) => (<m.radio key={idx} value={opt.value}> {opt.children} {opt.info && <m.info>{opt.info}</m.info>} </m.radio>))}
      </m.radios>)
    default: return null
  }
}

export const MenubarDemo: React.FC<MenubarDemoProps> = ({ config }) => (
  <m.root>
    {config.map((menu, idx) => (
      <m.menu key={idx}>
        <m.menuTrigger>{menu.trigger}</m.menuTrigger>
        <m.menuContent>  {menu.items.map((item, index) => renderMenuItem(item, index))} </m.menuContent>
      </m.menu>
    ))}
  </m.root>
)
