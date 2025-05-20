import React from "react";
import ReactDOM from "react-dom/client";


const App: React.FC = () =>
{

  const test = async () =>
  {

  }
  test()


  return (
    <div className="h-screen bg-background p-2">

    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
