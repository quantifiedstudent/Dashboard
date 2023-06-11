export default interface IGraphCanvasCourseSubmissions {
  
  canvasSubmissions: ISubmissionInCourse[];
  courseId: number;
}
export interface ISubmissionInCourse {
  id: number;
  courseId: number;
  submitted_at: Date;
  submittedAtString: string;
  assignment_id: number;
}

  