import React, { useContext } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import "./css/popup_window.css";

interface PopupProps {
  children: React.ReactNode;
  onPressClose?: () => void;
  onPressOpen?: (element: React.ReactNode) => void;
  onPressMore?: () => void;
  openInFull?: boolean;
}

export default function PopupWindow({ children, onPressClose, onPressOpen, onPressMore, openInFull = false }: PopupProps) {
  const handleClick = () => {
    if (onPressOpen) {
      onPressOpen(children);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay__content">
          {children}
          <div className="chart-container__buttons">
            {openInFull && (<div className="chart-container__buttons__options" onClick={onPressClose}><CloseRoundedIcon /></div>)}
            {!openInFull && (<div className="chart-container__buttons__options" onClick={handleClick}><OpenInFullRoundedIcon /></div>)}
            {onPressMore && (<div className="chart-container__buttons__more" onClick={onPressMore}><MoreHorizRoundedIcon /></div>)}
          </div>
      </div>
    </div>
  );
};
