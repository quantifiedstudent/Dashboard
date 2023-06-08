import { useEffect, useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './navbar'
import './css/app.css'
import GraphSubmissionsWithWeatherDTO from "./GraphSubmissionsWithWeather";
import WeatherOfTheDay from "./GraphSubmissionsWithWeather";
import SubmissionWithDate from "./GraphSubmissionsWithWeather";
import ExampleChart from "./ExampleChart";
import GetDataButton from "./GetDataButton";
import { ChartData, Point } from "chart.js";

function App() {
  const [count, setCount] = useState(0)
  const fetchData = async () => {
    const result = await fetch(
      "http://localhost:7003/graphSubmissionsWithWeather/course/13086?startDate=2022-09-01&endDate=2022-09-30"
    );

    const resultJson = await result.json();
    const resultDTO: GraphSubmissionsWithWeatherDTO = resultJson;

    const labels = resultDTO.temperature.map((x) => x.date);

    // function nrOfSubmissions(
    //   resultDTO: GraphSubmissionsWithWeatherDTO
    // ): number[] {
    //   const list: number[] = [];
    //   for (
    //     let i = 0;
    //     i < resultDTO.temperature.map((x) => x.date).length;
    //     i++
    //   ) {
    //     if (
    //       resultDTO.temperature.map((x) => x.date)[i] ==
    //       resultDTO.submissions[i].date
    //     ) {
    //       list[i] = resultDTO.submissions.filter(
    //         (x) => x.date == resultDTO.submissions[i].date
    //       ).length;
    //     }
    //   }
    //   return list;
    // }

    const data: ChartData<"line"> = {
      labels,
      datasets: [
        {
          label: "Temperature",
          data: resultDTO.temperature.map((x) => x.temperature),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          yAxisID: "y",
        },
        {
          label: "Number of Assigments",
          data: [
            0, 0, 0, 1, 2, 0, 1, 3, 0, 2, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
            1, 0, 1, 2, 0, 0,
          ],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          yAxisID: "y1",
        },
      ],
    };

    setChartData(data);
  };

  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

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
        <GetDataButton onPressFunction={fetchData}></GetDataButton>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="charts">
        {/* <ExampleChart data={chartData} /> */}
        <div><ExampleChart data={chartData} /></div>
        <div><ExampleChart data={chartData} /></div>
        <div><ExampleChart data={chartData} /></div>
        <div><ExampleChart data={chartData} /></div>
        <div style={{ backgroundColor: 'red' }}></div>
        <div style={{ backgroundColor: 'green' }}></div>
        <div style={{ backgroundColor: 'white' }}></div>
        <div style={{ backgroundColor: 'purple' }}></div>
        <div style={{ backgroundColor: 'yellow' }}></div>
      </div>
    </>
  )
}

export default App
