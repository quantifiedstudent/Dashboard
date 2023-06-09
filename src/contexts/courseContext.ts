import { createContext } from "react";
import Course from "../models/ICourse";

const fetchData = async () => {
  const result = await fetch(`http://localhost:7000/course/student/24412`);
  const courses: Course[] = (await result.json()) as Course[];
  return courses
};

export const courseContext = createContext(await fetchData());
