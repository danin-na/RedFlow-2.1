import React from "react";
import ReactDOM from "react-dom/client";
import { collection } from "./service/redflow.collection";



const App: React.FC = () =>
{
  const addText = async () =>
  {
    // Get the current selected Element
    const el = await webflow.getSelectedElement();

    // If text content can be set, update it!
    if (el && el.textContent) {
      await el.setTextContent("hello world!");
    } else {
      alert("Please select a text element");
    }
  };

  async function test ()
  {
    const t1 = await collection.setByName('TEST', 'if_exist_return_existing')
    const t2 = await collection.setByName('TEST', 'if_exist_return_existing')
    const t3 = await collection.setByName('TEST', 'if_exist_return_undefined')

    console.log(t1)
    console.log(t2)
    console.log(t3)

    const p1 = await collection.getByName('TEST1', 'if_notExist_return_undefined')
    const p2 = await collection.getByName('TEST1', 'if_notExist_return_newOne')
    const p3 = await collection.getByName('TEST1', 'if_notExist_return_undefined')

    console.log(p1)
    console.log(p2)
    console.log(p3)
  }

  test()

  return (
    <div>
      <h1>Welcome to My React App!</h1>
      <p>This is a basic React application.</p>
      <button onClick={addText}> Add text </button>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
