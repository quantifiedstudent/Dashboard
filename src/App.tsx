import { useEffect, useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Navbar'
import './css/app.css'
import ExampleChart from "./charts/ExampleChart";
import CanvasOneCourseSubmissionsChart from "./charts/CanvasOneCourseSubmissionsChart";
import ChartContainer from "./ChartContainer";
import GradesWeatherChart from "./charts/GradesWeatherChart";
import PopupChart from "./PopupChart";

export default function App() {  
  const [count, setCount] = useState(0)

  const [showPopup, setShowPopup] = useState(true);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Navbar />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="charts">
        <ChartContainer><CanvasOneCourseSubmissionsChart startDate={new Date('2023-03-01')} endDate={new Date('2023-04-01')} courseId={13086}/></ChartContainer>
        <ChartContainer><GradesWeatherChart/></ChartContainer>
        <ChartContainer><ExampleChart/></ChartContainer>
        <ChartContainer><ExampleChart/></ChartContainer>
        <ChartContainer><ExampleChart/></ChartContainer>
        <ChartContainer><ExampleChart/></ChartContainer>
        {/* <ChartContainer><div style={{ backgroundColor: 'red' }}></div></ChartContainer>
        <div style={{ backgroundColor: 'green' }}></div>
        <div style={{ backgroundColor: 'white' }}></div>
        <div style={{ backgroundColor: 'purple' }}></div>
        <div style={{ backgroundColor: 'yellow' }}></div> */}
      </div>
      {showPopup && (
      <PopupChart onPressClose={togglePopup}>
        <ExampleChart/>
      </PopupChart>)}
    </>
  )
}