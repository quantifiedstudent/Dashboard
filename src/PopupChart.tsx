import React from "react";
import "./css/popup_chart.css";
import ChartContainer from "./ChartContainer";

interface PopupProps {
  onPressClose: () => void;
  children: React.ReactNode;
}

export default function PopupChart({ onPressClose, children }:PopupProps){
  return (
    <div className="popupchart-overlay">
      <div className="popupchart-overlay__content">
        <ChartContainer onPressClose={onPressClose} openInFull={true}>{children}</ChartContainer>
      </div>
    </div>
  );
};
