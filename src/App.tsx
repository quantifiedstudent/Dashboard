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
import Colours from "./Colours";

export default function App() {

  const [colourSet, setColourSet] = useState('dark');

  const toggleDarkMode = () => {
    let newColourSet:string;
    colourSet == 'dark' ? newColourSet = 'light' : newColourSet = 'dark';
    colourSet == 'dark' ? setColourSet('light') : setColourSet('dark');
    switch (newColourSet) {
      case "dark":
        document.documentElement.style.setProperty('--main1', Colours.main1Dark);
        document.documentElement.style.setProperty('--main2', Colours.main2Dark);
        document.documentElement.style.setProperty('--background', Colours.backgroundDark);
        document.documentElement.style.setProperty('--font-colour', Colours.fontColourDark);
        break;
      case "light":
        document.documentElement.style.setProperty('--main1', Colours.main1Light);
        document.documentElement.style.setProperty('--main2', Colours.main2Light);
        document.documentElement.style.setProperty('--background', Colours.backgroundLight);
        document.documentElement.style.setProperty('--font-colour', Colours.fontColourLight);
        break;
      case "user":
        document.documentElement.style.setProperty('--main1', "#232323");
        document.documentElement.style.setProperty('--main2', "#efefef");
        document.documentElement.style.setProperty('--background', "#101010");
        document.documentElement.style.setProperty('--font-colour', "#efefef");
        break;
      default:
        document.documentElement.style.setProperty('--main1', Colours.main1Dark);
        document.documentElement.style.setProperty('--main2', Colours.main2Dark);
        document.documentElement.style.setProperty('--background', Colours.backgroundDark);
        document.documentElement.style.setProperty('--font-colour', Colours.fontColourDark);
        break;
    }
  };

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
        setOpenedPopupWindow(<div></div>);
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
        <button onClick={toggleDarkMode}>switch theme</button>
    </>
  )
}