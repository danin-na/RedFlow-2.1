import React from "react";
import ReactDOM from "react-dom/client";


const App: React.FC = () =>
{

  const test = async () =>
  {

    const all = await webflow.getDefaultVariableCollection()




    console.log('-----------------------')
    console.log(all)
    const test = all?.id
    console.log(test)
    const res = await webflow.removeVariableCollection(test)
    console.log('res', res)
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
