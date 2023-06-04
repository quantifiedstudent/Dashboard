import GraphSubmissionsWithWeatherDTO from "./GraphSubmissionsWithWeather";
import WeatherOfTheDay from "./GraphSubmissionsWithWeather";
import SubmissionWithDate from "./GraphSubmissionsWithWeather";
import "./App.css";
import ExampleChart from "./ExampleChart";
import GetDataButton from "./GetDataButton";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { ChartData, Point } from "chart.js";

function App() {
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

  const [chartData, setChartData] = useState<
    ChartData<"line">
  >({ labels: [], datasets: [] });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Proof of Concept</h1>
        <div className="exampleChart">
          <ExampleChart data={chartData} />
        </div>
      </div>
      <div className="card">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            fetchData();
          }}
        >
          Get Data
        </Button>
        <p>
          Test of <code>Chart.js</code> library
        </p>
      </div>
    </>
  );
}

export default App;
