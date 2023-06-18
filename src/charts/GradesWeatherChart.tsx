import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import GraphSubmissionsWithWeatherDTO from "../models/GraphSubmissionsWithWeather";
import { useEffect, useState, useContext } from "react";
import Course from "../models/ICourse";
import { courseContext } from "../contexts/courseContext";
import Select, { ActionMeta, SingleValue } from "react-select";
import DatePickerChart from "../components/DatePicker";


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

const options = (courseName: string): ChartOptions<"line"> => ({
  responsive: true,
  aspectRatio: 2 | 3,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: `Canvas Course "${courseName}`,
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
});



interface GradesWeatherChartProps {
  data?: ChartData<"line">;
  courseId: number;
  startDate: Date;
  endDate: Date;
}

export default function GradesWeatherChart({ data, courseId, startDate, endDate }: GradesWeatherChartProps) {

  const courses: Course[] = useContext(courseContext);

  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  useEffect(() => {
    fetchData();
  }, [selectedCourse, startDate, endDate]);

  const fetchData = async () => {



    const result = await fetch(
      `http://localhost:7003/graphSubmissionsWithWeather/course/${selectedCourse.id}?startDate=${startDate.toISOString().substring(0, 10)}&endDate=${endDate.toISOString().substring(0, 10)}`
    );

    const resultJson = await result.json();
    const resultDTO: GraphSubmissionsWithWeatherDTO = resultJson;

    const labels = resultDTO.temperature.map((x) => x.date);


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
          label: "Score",
          data: resultDTO.submissions.map((x) => x.score),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          yAxisID: "y1",
        },
      ],
    };
    setChartData(data);
  };

  const courseName = selectedCourse ? selectedCourse.name : "";

  const handleSelectChange = (
    newSelectedCourse: SingleValue<Course>,
    actionMeta: ActionMeta<Course>
  ) => {
    setSelectedCourse(newSelectedCourse as Course);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "var(--main1)",
      border: "1px solid var(--main2)",
      color: "var(--font-colour)",
    }),
    option: (provided: any) => ({
      ...provided,
      backgroundColor: "var(--main1)",
      color: "var(--font-colour)",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      backgroundColor: "var(--main1)",
      color: "var(--font-colour)",
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: "var(--main1)",
      color: "var(--font-colour)",
    }),
  };

  return(  
  <div className="chart">
  <DatePickerChart/>


  <Select
        options={courses}
        defaultValue={selectedCourse}
        getOptionValue={(option) => `${option.id}`}
        getOptionLabel={(option) => `${option.name}`}
        onChange={handleSelectChange}
        className="chart__select"
        styles={customStyles}
  />
  <Line options={options(courseName ? courseName : "")} data={chartData}  />;
  </div>
  )
}
