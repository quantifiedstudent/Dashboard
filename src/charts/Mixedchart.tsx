import React, { useState, useEffect } from "react";
import { Line, Bubble } from "react-chartjs-2";
import GraphSubmissionsWithWeatherDTOMaxPoints from "../models/GraphSubmissionsWithWeatherMaxPoints";
import { ChartData } from "chart.js/auto";

const MixedChart = () => {
  const [temperatureData, setTemperatureData] = useState<
    ChartData<"line"> | undefined
  >(undefined);
  const [bubbleData, setBubbleData] = useState<ChartData<"bubble"> | undefined>(
    undefined
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await fetch(
        `http://localhost:7003/graphSubmissionsWithWeather/course/13094/maxPoints?startDate=2023-05-01&endDate=2023-06-01`
      );

      const resultJson = await result.json();
      const resultDTO: GraphSubmissionsWithWeatherDTOMaxPoints = resultJson;

      const temperatureData: ChartData<"line"> = {
        labels: resultDTO.temperature.map((data: any) => data.date),
        datasets: [
          {
            label: "Temperature",
            data: resultDTO.temperature.map((data: any) => data.temperature),
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            type: "line", // Specify the chart type as "line"
          },
        ],
      };

      const filteredSubmissions = resultDTO.submissions.filter(
        (submission) => submission.score !== null
      );

      const bubbleData: ChartData<"bubble"> = {
        datasets: filteredSubmissions.map((submission) => ({
          label: submission.date,
          data: submission.score.map((criterion: any) => ({
            x: Number(submission.date), // Convert the date to a number if needed
            y: criterion.studentsPoints,
            r: criterion.maxPoints,
          })),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          type: "bubble",
        })),
      };

      setTemperatureData(temperatureData as ChartData<"line">);
      setBubbleData(bubbleData as ChartData<"bubble">);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (temperatureData === undefined || bubbleData === undefined) {
    // Display loading state or placeholder
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Line data={temperatureData} options={options} />
      <Bubble data={bubbleData} options={options} />
    </div>
  );
};

export default MixedChart;
