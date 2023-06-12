import { createContext, useContext } from "react";
import Course from "../models/ICourse";
import { studentContext } from "./studentContext";

const fetchData = async () => {
  try {
    const studentId = + await (await fetch(`http://localhost:7000/student/selfId`)).json();
    const result = await fetch(`http://localhost:7000/course/student/${studentId}`);
    const courses: Course[] = (await result.json()) as Course[];
    return courses
  }
  catch (error) {
    console.error(`Cannot fetch courses. Message: ${error}`)
    return [];
  }
};

export const courseContext = createContext(await fetchData());
