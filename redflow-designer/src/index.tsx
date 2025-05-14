import React from "react";
import ReactDOM from "react-dom/client";

import { CanvasTab } from "@/src/components/canvasTab";



const App: React.FC = () =>
{


  return (
    <div>
      <CanvasTab></CanvasTab>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
