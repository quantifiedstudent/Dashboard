import React, { useContext } from "react";
import PersonIcon from '@mui/icons-material/Person';
import IStudent from "../models/IStudent";
import { studentContext } from "../contexts/studentContext";
import "../css/windows.css";

interface NotificationsWindowProps {
  onPressClose?: () => void;
  onPressOpen?: (element: React.ReactNode) => void;
  onPressMore?: () => void;
  openInFull?: boolean;
}

export default function NotificationsWindow({ onPressClose, onPressOpen, onPressMore, openInFull = false }: NotificationsWindowProps){
  
  return (
    <div className="student__window">
        <div className="student__logo navbar__icons__icon" onClick={onPressClose}><PersonIcon/></div>
        <div>
            <h2>Notifications</h2>
            <h3>Nothing New</h3>
        </div>
    </div>
  );
};
