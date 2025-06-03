import React from "react"
import ReactDOM from "react-dom/client"

const App: React.FC = () =>
{
  const addText = async () =>
  {
    // Get the current selected Element
    const el = await webflow.getSelectedElement()

    // If text content can be set, update it!
    if (el && el.textContent)
    {
      await el.setTextContent("hello world!")
    } else
    {
      alert("Please select a text element")
    }
  }

  return (
    <div>
      Hey
    </div>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)
root.render(<App />)
