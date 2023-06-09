import React from 'react';
import './css/popup_chart.css';
import ChartContainer from './ChartContainer';

interface PopupProps {
  onClose: () => void;
  children: React.ReactNode;
}

const PopupChart: React.FC<PopupProps> = ({ onClose, children }) => {
    return (
      <div className="overlay">
        <div className="overlay__content">
          <button className="overlay__content__button" onClick={onClose}>
            Close
          </button>
          <ChartContainer>{children}</ChartContainer>
        </div>
      </div>
    );
  };

export default PopupChart;
