import { createContext } from "react";
import IStudent from "../models/IStudent";

const fetchData = async () => {
  try{
    const result = await fetch(`http://localhost:7000/student/self`);
    const studentData: IStudent = await result.json();
    return studentData
  }
  catch(error){
     console.error(`Cannot fetch student data. Error message: ${error}`)
     return (new Object as IStudent);
  }
};

export const studentContext = createContext(await fetchData());
