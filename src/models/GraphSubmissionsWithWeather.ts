export interface WeatherOfTheDay {
    date: string;
    temperature: number;
}
export type SubmissionScoreWithDate = {
    date: string;
    score: number;
}

export default interface GraphSubmissionsWithWeatherDTO {
    submissions: SubmissionScoreWithDate[];
    temperature: WeatherOfTheDay[];
}
