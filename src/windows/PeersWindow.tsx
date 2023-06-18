import React, { useContext } from "react";
import PersonIcon from '@mui/icons-material/Person';
import IStudent from "../models/IStudent";
import { studentContext } from "../contexts/studentContext";
import "../css/windows.css";

interface PeersWindowProps {
  onPressClose?: () => void;
  onPressOpen?: (element: React.ReactNode) => void;
  onPressMore?: () => void;
  openInFull?: boolean;
}

export default function PeersWindow({ onPressClose, onPressOpen, onPressMore, openInFull = false }: PeersWindowProps){  
  return (
    <div className="student__window">
        <div className="student__logo navbar__icons__icon" onClick={onPressClose}><PersonIcon/></div>
        <div>
            <h2>Peers</h2>
            <h3>Nothing New</h3>
        </div>
    </div>
  );
};
