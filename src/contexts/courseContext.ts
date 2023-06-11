import { createContext } from "react";
import Course from "../models/ICourse";

const fetchData = async () => {
  try{
    const result = await fetch(`http://localhost:7000/course/student/24412`);
    const courses: Course[] = (await result.json()) as Course[];
    console.log(courses)
    return courses
  }
  catch(error){
     console.error(`Cannot fetch courses. Message: ${error}`)
     return [];
  }
};

export const courseContext = createContext(await fetchData());
