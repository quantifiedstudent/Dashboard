import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import IGraphCanvasCourseSubmissions, { ISubmissionInCourse } from '../models/SubmissionInCourse'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Canvas Course Submissions',
        },
    },
};

interface CanvasOneCourseSubmissionsChartProps {
    data?: ChartData<"bar">;
    courseId: number;
    startDate: Date;
    endDate: Date;
}

export default function CanvasOneCourseSubmissionsChart({data, courseId, startDate, endDate}: CanvasOneCourseSubmissionsChartProps) {
    const fetchData = async () => {        
        const dates: Date[] = [];
        const labels: string[] = [];
        
        let currentDate = startDate;
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            labels.push(currentDate.toISOString().split('T')[0])
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        const result = await fetch(
            `http://localhost:7003/graphCanvasOneCourseSubmissions/course/${courseId}`
        );
        const submissionsInCourse: ISubmissionInCourse[] = (await result.json() as IGraphCanvasCourseSubmissions).canvasSubmissions;
    
        const resultArray: number[] = Array(dates.length).fill(0);
    
        for (const obj of submissionsInCourse) {
            const objDate = new Date(obj.submitted_at); // Convert objDate to Date object
    
            const index = dates.findIndex(date =>
                date.getFullYear() === objDate.getFullYear() &&
                date.getMonth() === objDate.getMonth() &&
                date.getDate() === objDate.getDate()
            );
        
            if (index !== -1) {
                resultArray[index]++;
            }
        }
    
        const data: ChartData<"bar"> = {
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
        setChartData(data);
    };

    const [chartData, setChartData] = useState<ChartData<"bar">>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        fetchData();
    }, []);

    return <Bar options={options} data={chartData} />;
}