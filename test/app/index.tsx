import React from "react"
import ReactDOM from "react-dom/client"
import { TEST } from "redflow-component"


const App: React.FC = () =>
{

  console.log(TEST) // 20

  return (
    <div>
      Hey 6
    </div>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)
root.render(<App />)

// npx @tailwindcss/cli -i ./public/tailwind.in.css -o ./public/tailwind.out.css --watch