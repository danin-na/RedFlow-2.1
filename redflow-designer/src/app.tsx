import React from "react"
import ReactDOM from "react-dom/client"
import { wf } from "./service"
import { MenubarDemo } from "./components/Navigation"

const sizeG: { name: string; val: SizeValue }[] = [
  { "name": "rf-size-g/25", "val": { "unit": "rem", "value": 0.48 } },
  { "name": "rf-size-g/50", "val": { "unit": "rem", "value": 0.61 } },
  { "name": "rf-size-g/75", "val": { "unit": "rem", "value": 0.78 } },
  { "name": "rf-size-g/100", "val": { "unit": "rem", "value": 1 } },
  { "name": "rf-size-g/125", "val": { "unit": "rem", "value": 1.28 } },
  { "name": "rf-size-g/150", "val": { "unit": "rem", "value": 1.63 } },
  { "name": "rf-size-g/175", "val": { "unit": "rem", "value": 2.08 } },
  { "name": "rf-size-g/200", "val": { "unit": "rem", "value": 2.65 } },
  { "name": "rf-size-g/225", "val": { "unit": "rem", "value": 3.38 } },
  { "name": "rf-size-g/250", "val": { "unit": "rem", "value": 4.31 } },
  { "name": "rf-size-g/275", "val": { "unit": "rem", "value": 5.5 } },
  { "name": "rf-size-g/300", "val": { "unit": "rem", "value": 7.01 } },
  { "name": "rf-size-g/325", "val": { "unit": "rem", "value": 8.94 } },
  { "name": "rf-size-g/350", "val": { "unit": "rem", "value": 11.41 } },
  { "name": "rf-size-g/375", "val": { "unit": "rem", "value": 14.65 } },
  { "name": "rf-size-g/400", "val": { "unit": "rem", "value": 18.57 } },
  { "name": "rf-size-g/425", "val": { "unit": "rem", "value": 23.68 } },
  { "name": "rf-size-g/450", "val": { "unit": "rem", "value": 30.21 } },
  { "name": "rf-size-g/475", "val": { "unit": "rem", "value": 38.54 } },
  { "name": "rf-size-g/500", "val": { "unit": "rem", "value": 49.16 } },
  { "name": "rf-size-g/525", "val": { "unit": "rem", "value": 62.72 } },
  { "name": "rf-size-g/550", "val": { "unit": "rem", "value": 80 } },
  { "name": "rf-size-g/575", "val": { "unit": "rem", "value": 102.06 } }
]

const sizeT: { name: string; val: SizeValue }[] = [
  { "name": "rf-size-t/50", "val": { "unit": "rem", "value": 0.61 } },
  { "name": "rf-size-t/75", "val": { "unit": "rem", "value": 0.78 } },
  { "name": "rf-size-t/100", "val": { "unit": "rem", "value": 1 } },
  { "name": "rf-size-t/125", "val": { "unit": "rem", "value": 1.28 } },
  { "name": "rf-size-t/150", "val": { "unit": "rem", "value": 1.63 } },
  { "name": "rf-size-t/175", "val": { "unit": "rem", "value": 2.08 } },
  { "name": "rf-size-t/200", "val": { "unit": "rem", "value": 2.65 } },
  { "name": "rf-size-t/225", "val": { "unit": "rem", "value": 3.38 } },
  { "name": "rf-size-t/250", "val": { "unit": "rem", "value": 4.31 } },
  { "name": "rf-size-t/275", "val": { "unit": "rem", "value": 5.5 } },
  { "name": "rf-size-t/300", "val": { "unit": "rem", "value": 7.01 } },
  { "name": "rf-size-t/325", "val": { "unit": "rem", "value": 8.94 } },
  { "name": "rf-size-t/350", "val": { "unit": "rem", "value": 11.41 } }
]

const colors: { name: string; val: ColorValue }[] = [
  { "name": "rf-color/white", "val": "white" },
  { "name": "rf-color/50", "val": "whitesmoke" },
  { "name": "rf-color/100", "val": "#edcece" },
  { "name": "rf-color/200", "val": "#e5a7a7" },
  { "name": "rf-color/300", "val": "#dc8181" },
  { "name": "rf-color/400", "val": "#d45a5a" },
  { "name": "rf-color/500", "val": "#c33" },
  { "name": "rf-color/600", "val": "#aa2b2b" },
  { "name": "rf-color/700", "val": "#822" },
  { "name": "rf-color/800", "val": "#661a1a" },
  { "name": "rf-color/900", "val": "#411" },
  { "name": "rf-color/950", "val": "#220909" },
  { "name": "rf-color/black", "val": "black" }
]


const App: React.FC = () => {

  webflow.setExtensionSize('comfortable')

  async function test() {
    const { collection: col, message } = await wf.collection.set.byName({ name: 'redflow' })

    if (col) {
      await Promise.all([
        ...colors.map(({ name, val }) => wf.variable.set.color({ name, val, col })),
        ...sizeG.map(({ name, val }) => wf.variable.set.size({ name, val, col })),
        ...sizeT.map(({ name, val }) => wf.variable.set.size({ name, val, col }))
      ])
    } else {
      webflow.notify({ type: 'Error', message })
    }
  }



  /*
  const test = async () =>
  {
    const { element: root } = await wf.element.get.root()
    const { DOM } = await wf.element.get.preset()
    if (root?.children) {

      const DOMElement = await root.append(webflow.elementPresets.DOM);

      if (DOMElement) {
        const test = DOMElement.setTag('script')
        DOMElement.setTextContent(JSON.stringify(myJson))
        const component = await webflow.registerComponent('MyCustomComponent', DOMElement);
        await wf.element.del.target({ target: DOMElement })
        const test2 = await component.getRootElement()


      }
            }
        }
*/


  // npx @tailwindcss/cli -i ./public/tailwind.in.css -o ./public/tailwind.out.css --watch

  return (
    <MenubarDemo></MenubarDemo>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)
root.render(<App />)
