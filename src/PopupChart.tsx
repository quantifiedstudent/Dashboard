import React from "react";
import "./css/popup_chart.css";
import ChartContainer from "./ChartContainer";

interface PopupProps {
  onPressClose: () => void;
  children: React.ReactNode;
}

const PopupChart: React.FC<PopupProps> = ({ onPressClose, children }) => {
  return (
    <div className="overlay">
      <div className="overlay__content">
        <ChartContainer onPressClose={onPressClose}>{children}</ChartContainer>
      </div>
    </div>
  );
};

export default PopupChart;
