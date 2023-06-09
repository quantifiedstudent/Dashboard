export interface WeatherOfTheDay {
    date: string;
    temperature: number;
}
export interface SubmissionWithDate {
    iD: number;
    date: string;
}

export default interface GraphSubmissionsWithWeatherDTO {
    submissions: SubmissionWithDate[];
    temperature: WeatherOfTheDay[];
}
