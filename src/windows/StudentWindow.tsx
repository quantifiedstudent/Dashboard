import React, { useContext } from "react";
import PersonIcon from '@mui/icons-material/Person';
import IStudent from "../models/IStudent";
import { studentContext } from "../contexts/studentContext";
import "../css/windows.css";

interface StudentWindowProps {
  onPressClose?: () => void;
  onPressOpen?: (element: React.ReactNode) => void;
  onPressMore?: () => void;
  openInFull?: boolean;
}

export default function StudentWindow({ onPressClose, onPressOpen, onPressMore, openInFull = false }: StudentWindowProps){
  
  const studnet: IStudent = useContext(studentContext);
  console.log(studnet);
  
  return (
    <div className="student__window">
        <div className="student__logo navbar__icons__icon" onClick={onPressClose}><PersonIcon/></div>
        <div>
            <h2>{studnet.name}</h2>
            <h3>{studnet.id}</h3>
        </div>
        <div>
            <h4><a href="#">Delete Your Information</a></h4>
        </div>
    </div>
  );
};
