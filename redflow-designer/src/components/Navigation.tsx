import React from 'react'
import { ui } from 'redflow'
const { Menu } = ui

type MenuItem =
	| { type: 'label'; children?: React.ReactNode; props?: React.ComponentProps<typeof Menu.label> }
	| { type: 'item'; children?: React.ReactNode; info?: React.ReactNode; props?: React.ComponentProps<typeof Menu.item> }
	| { type: 'check'; children?: React.ReactNode; info?: React.ReactNode; props?: React.ComponentProps<typeof Menu.check> }
	| {
		type: 'radio'
		value: string
		items: { value: string; children?: React.ReactNode; info?: React.ReactNode }[]
		props?: React.ComponentProps<typeof Menu.radios>
	}
	| { type: 'menu'; children?: React.ReactNode; items: MenuItem[]; info?: React.ReactNode; props?: React.ComponentProps<typeof Menu.sub> }
	| { type: 'break'; props?: React.ComponentProps<typeof Menu.break> }

export interface MenuData {
	trigger: string
	items: MenuItem[]
}

export const menuData: MenuData[] = [
	{
		trigger: 'Demo',
		items: [
			{
				type: 'label', children: 'Item : Label',
				props: { className: 'text-sm text-gray-500' }
			},
			{
				type: 'item', children: 'Item', info: 'Hello',
				props: { onClick: () => alert('Clicked Item') }
			},
			{
				type: 'item', children: 'Disabled',
				props: { disabled: true }
			},
			{ type: 'break' },
			{ type: 'item', children: 'Info Example', info: '⌘T' },
			{
				type: 'menu',
				children: 'Sub Menu',
				items: [
					{ type: 'item', children: 'SubItem' },
					{ type: 'break' },
					{ type: 'item', children: 'Sub Disabled', props: { disabled: true } },
				],
				info: 'Sub Info',
			},
			{ type: 'break' },
			{ type: 'check', children: 'Checkbox Option', info: 'check info', props: { checked: true } },
			{ type: 'check', children: 'Checkbox Option 2', props: { checked: false } },
			{ type: 'break' },
			{
				type: 'radio',
				value: 'opt3',
				items: [
					{ value: 'opt1', children: 'Radio1', info: 'Radio1 Info' },
					{ value: 'opt2', children: 'Radio2', info: 'Radio2 Info' },
					{ value: 'opt3', children: 'Radio3' }, // no info
				],
			},
			{ type: 'break' },
			{ type: 'item', children: 'Inset Item', info: 'Inset!', props: { inset: true } },
		],
	},
]

function renderMenuItem(item: MenuItem, key: React.Key): React.ReactNode {
	switch (item.type) {
		case 'break':
			return <Menu.break key={key} {...item.props} />
		case 'label':
			return <Menu.label key={key} {...item.props}>{item.children}</Menu.label>
		case 'item':
			return <Menu.item key={key} {...item.props}>{item.children}{item.info && <Menu.info>{item.info}</Menu.info>}</Menu.item>
		case 'check':
			return <Menu.check key={key} {...item.props}>{item.children}{item.info && <Menu.info>{item.info}</Menu.info>}</Menu.check>
		case 'menu':
			return (
				<Menu.sub key={key} {...item.props}>
					<Menu.subTrigger>{item.children}{item.info && <Menu.info>{item.info}</Menu.info>}</Menu.subTrigger>
					<Menu.subContent>	{item.items.map((subItem, idx) => renderMenuItem(subItem, idx))}</Menu.subContent>
				</Menu.sub>
			)
		case 'radio':
			return (
				<Menu.radios key={key} value={item.value} {...item.props}>
					{item.items.map((opt, idx) => (
						<Menu.radio key={idx} value={opt.value}>{opt.children}{opt.info && <Menu.info>{opt.info}</Menu.info>}</Menu.radio>
					))}
				</Menu.radios>
			)
		default:
			return null
	}
}


// --- Component ---
export function MenubarDemo() {
	return (
		<Menu.root>
			{menuData.map((menu, idx) => (
				<Menu.menu key={idx}>
					<Menu.menuTrigger>{menu.trigger}</Menu.menuTrigger>
					<Menu.menuContent>
						{menu.items.map((item, index) => renderMenuItem(item, index))}
					</Menu.menuContent>
				</Menu.menu>
			))}
		</Menu.root>
	)
}
