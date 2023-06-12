import { useState } from "react";
import Navbar from './Navbar'
import './css/app.css'
import ExampleChart from "./charts/ExampleChart";
import CanvasOneCourseSubmissionsChart from "./charts/CanvasOneCourseSubmissionsChart";
import ChartContainer from "./ChartContainer";
import GradesWeatherChart from "./charts/GradesWeatherChart";
import PopupChart from "./PopupChart";
import PopupWindow from "./PopupWindow";
import StudentWindow from "./windows/StudentWindow";
import TuneWindow from "./windows/TuneWindow";

export default function App() {

  // Chart popups system
  const [showChartPopup, setShowChartPopup] = useState(false);
  const [openedPopupChart, setOpenedPopupChart] = useState<React.ReactNode>(null);

  const disableChartPopup = () => {
    setOpenedPopupChart(null);
    setShowChartPopup(false);
  };

  const enableChartPopup = (element: React.ReactNode) => {
    setOpenedPopupChart(element);
    setShowChartPopup(true);
  };

  // Window popups system
  const [showWindowPopup, setShowWindowPopup] = useState(false);
  const [openedPopupWindow, setOpenedPopupWindow] = useState<React.ReactNode>(null);

  const disableWindowPopup = () => {
    setOpenedPopupWindow(null);
    setShowWindowPopup(false);
  };

  const enableWindowPopup = (element: string) => {
    switch (element) {
      case "tune":
        setOpenedPopupWindow(<TuneWindow/>);
        setShowWindowPopup(true);
        break;
      case "peers":
        setOpenedPopupWindow(<div></div>);
        setShowWindowPopup(true);
        break;
      case "notifications":
        setOpenedPopupWindow(<div></div>);
        setShowWindowPopup(true);
        break;
      case "student":
        setOpenedPopupWindow(<StudentWindow/>);
        setShowWindowPopup(true);
        break;
      default:
        setOpenedPopupWindow(null);
        setShowWindowPopup(false);
        break;
    }
  };

  return (
    <>
      <Navbar onPressOpen={enableWindowPopup} />
      <div className="charts">
        <ChartContainer onPressOpen={enableChartPopup}><CanvasOneCourseSubmissionsChart startDate={new Date('2023-03-01')} endDate={new Date('2023-04-01')} courseId={13086} /></ChartContainer>
        <ChartContainer onPressOpen={enableChartPopup}><GradesWeatherChart /></ChartContainer>
        <ChartContainer onPressOpen={enableChartPopup}><ExampleChart /></ChartContainer>
        <ChartContainer onPressOpen={enableChartPopup}><ExampleChart /></ChartContainer>
        <ChartContainer onPressOpen={enableChartPopup}><ExampleChart /></ChartContainer>
        <ChartContainer onPressOpen={enableChartPopup}><ExampleChart /></ChartContainer>
        {/* <ChartContainer><div style={{ backgroundColor: 'red' }}></div></ChartContainer>
        <div style={{ backgroundColor: 'green' }}></div>
        <div style={{ backgroundColor: 'white' }}></div>
        <div style={{ backgroundColor: 'purple' }}></div>
        <div style={{ backgroundColor: 'yellow' }}></div> */}
      </div>
      {showChartPopup && (
        <PopupChart onPressClose={disableChartPopup}>
          {openedPopupChart}
        </PopupChart>)}
      {showWindowPopup && (
        <PopupWindow onPressClose={disableWindowPopup} openInFull={true}>
          {openedPopupWindow}
        </PopupWindow>)}
    </>
  )
}