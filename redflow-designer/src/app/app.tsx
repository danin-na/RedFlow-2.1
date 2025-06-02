import React from "react"
import ReactDOM from "react-dom/client"

const App: React.FC = () =>
{
  return (
    <div className='text-red-500'>TEST</div>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)
root.render(<App />)

// npx @tailwindcss/cli -i ./public/tailwind.in.css -o ./public/tailwind.out.css --watch