export interface WeatherOfTheDay {
    date: string;
    temperature: number;
}
export interface GradedCriteria {
    id: string;
    criterion_id: string;
    learning_outcome_id: number | null;
    description: string;
    comments: string;
    comments_html?: string;
    studentsPoints?: number;
    maxPoints?: number;
    above_threshold?: boolean;
}

export type SubmissionScoreWithDate = {
    date: string;
    score: GradedCriteria[];
}

export default interface GraphSubmissionsWithWeatherDTOMaxPoints {
    submissions: SubmissionScoreWithDate[];
    temperature: WeatherOfTheDay[];
}
