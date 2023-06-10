import React from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import "./css/popup_chart.css";

interface PopupProps {
  children: React.ReactNode;
  onPressClose?: () => void;
  onPressOpen?: (element: React.ReactNode) => void;
  onPressMore?: () => void;
  openInFull?: boolean;
}

export default function PopupOptions({ children, onPressClose, onPressOpen, onPressMore, openInFull = false }:PopupProps){
  const handleClick = () => {
    if (onPressOpen) {
      onPressOpen(children);
    }
  };
  
  return (
    <div className="overlay">
      <div className="overlay__content">
        <div className="chart-container">
          {children}
          <div className="chart-container__buttons">
            {openInFull && (<div className="chart-container__buttons__options" onClick={onPressClose}><CloseRoundedIcon /></div>)}
            {!openInFull && (<div className="chart-container__buttons__options" onClick={handleClick}><OpenInFullRoundedIcon /></div>)}
            <div className="chart-container__buttons__more"><MoreHorizRoundedIcon /></div>
          </div>
        </div>
      </div>
    </div>
  );
};
