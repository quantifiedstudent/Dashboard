import HelloWorld from "./HelloWorld";

import "./App.css";
import ExampleChart from "./ExampleChart";
import GetDataButton from "./GetDataButton";

function App() {
  return (
    <>
      <div>
        <HelloWorld />
        <div className="exampleChart">
          <ExampleChart />
        </div>
      </div>
      <div className="card">
        <GetDataButton />
        <p>
          Test of <code>Chart.js</code> library
        </p>
      </div>
      <p className="read-the-docs">Based and made on Vite.js</p>
    </>
  );
}

export default App;
