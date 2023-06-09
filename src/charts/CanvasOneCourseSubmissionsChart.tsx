import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";
import IGraphCanvasCourseSubmissions, {
  ISubmissionInCourse,
} from "../models/ISubmissionInCourse";
import Course from "../models/ICourse";
import { courseContext } from "../contexts/courseContext";
import Select, { ActionMeta, SingleValue } from "react-select";
import Colours from "../css/Colours";
import DateRangePicker from "../components/DatePickerComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockData: ChartData<"bar"> = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: "Submissions",
      data: [1, 2, 3, 4, 5],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
    },
  ],
};

const options = (courseName: string) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: `Canvas Course "${courseName}" Submissions`,
      color: Colours.fontColourDark,
    },
  },
  scales: {
    y: {
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
});

interface CanvasOneCourseSubmissionsChartProps {
  data?: ChartData<"bar">;
  startDate: Date;
  endDate: Date;
}

export default function CanvasOneCourseSubmissionsChart({
  data,
  startDate,
  endDate,
}: CanvasOneCourseSubmissionsChartProps) {
  const courses: Course[] = useContext(courseContext);

  const currentDate = new Date();
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(lastMonth);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(currentDate);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  useEffect(() => {
    fetchData();
  }, [selectedCourse, selectedStartDate, selectedEndDate]);

  //   async function fetchData(){
  const fetchData = async () => {
    const dates: Date[] = [];
    const labels: string[] = [];

    let currentDate = structuredClone(selectedStartDate);
    while (currentDate <= selectedEndDate) {
      dates.push(new Date(currentDate));
      labels.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const result = await fetch(
      `http://localhost:7003/graphCanvasOneCourseSubmissions/course/${selectedCourse.id}`
    );
    const resultJson = await result.json();
    const submissionsInCourse: ISubmissionInCourse[] = (
      resultJson as IGraphCanvasCourseSubmissions
    ).canvasSubmissions;

    const resultArray: number[] = Array(dates.length).fill(0);

    for (const obj of submissionsInCourse) {
      const objDate = new Date(obj.submitted_at); // Convert objDate to Date object

      const index = dates.findIndex(
        (date) =>
          date.getFullYear() === objDate.getFullYear() &&
          date.getMonth() === objDate.getMonth() &&
          date.getDate() === objDate.getDate()
      );

      if (index !== -1) {
        resultArray[index]++;
      }
    }

    let data: ChartData<"bar"> = {
      labels,
      datasets: [
        {
          label: "Submissions",
          data: resultArray,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          yAxisID: "y",
        },
      ],
    };
    console.log(startDate, endDate);
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
      color: "var(--font-colour)",
      border: "2px solid var(--main2)",
      borderRadius: "0.5rem",
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

  return (
    <div className="chart">
      <DateRangePicker onDateChange={handleDateChange} />
      <Select
        options={courses}
        defaultValue={selectedCourse}
        getOptionValue={(option) => `${option.id}`}
        getOptionLabel={(option) => `${option.name}`}
        onChange={handleSelectChange}
        className="chart__select"
        styles={customStyles}
      />
      <Bar options={options(courseName ? courseName : "")} data={chartData} />
    </div>
  );
}
