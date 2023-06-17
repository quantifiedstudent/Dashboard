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
import Colours from "../css/Colours";

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
      color: Colours.fontColourDark,
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
        color: Colours.fontColourDark,
      },
      ticks: {
        color: Colours.fontColourDark,
      },
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
      title: {
        color: Colours.fontColourDark,
      },
      ticks: {
        color: Colours.fontColourDark,
      },
    },
    x: {
      ticks: {
        color: Colours.fontColourDark,
      },
    },
  },
};

interface MyLineChartProps {
  data?: ChartData<"line">;
}

export default function ExampleChart({ data }: MyLineChartProps) {
  return <Line data={mockData} options={options} />;
}
