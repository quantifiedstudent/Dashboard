import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import GraphSubmissionsWithWeatherDTO from "../models/GraphSubmissionsWithWeather";
import WeatherOfTheDay from "../models/GraphSubmissionsWithWeather";
import SubmissionWithDate from "../models/GraphSubmissionsWithWeather";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const mockData = {
  labels: Array.from(Array(10).keys()),
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 5, 4],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
    },
    {
      label: "Dataset 2",
      data: [200, 300, 100, 333, 555],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
  ],
};

export const options: ChartOptions<"line"> = {
  responsive: true,
  aspectRatio: 2 | 3,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left",
      title: {
        display: true,
        text: "Temperature",
      },
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

interface MyLineChartProps {
  data?: ChartData<"line">;
}

export default function GradesWeatherChart({ data }: MyLineChartProps) {
  
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

  return <Line data={chartData} options={options} />;
}
