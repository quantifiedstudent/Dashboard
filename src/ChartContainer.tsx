import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import './css/chart_container.css'

interface ChartContainerProps {
  children: React.ReactNode;
  onPressClose?: () => void;
  onPressOpen?: (element: React.ReactNode) => void;
  onPressMore?: () => void;
}

export default function ChartContainer({children, onPressClose, onPressOpen, onPressMore}: ChartContainerProps ) {
  const handleClick = () => {
    if (onPressOpen) {
      onPressOpen(children);
    }
  };
  return (
    <div className="chart-container">
      {children}
      <div className="chart-container__buttons">
        <div className="chart-container__buttons__options" onClick={onPressClose}><CloseRoundedIcon/></div>
        <div className="chart-container__buttons__fullscreen" onClick={handleClick}><OpenInFullRoundedIcon/></div>
        <div className="chart-container__buttons__more"><MoreHorizRoundedIcon/></div>
      </div>
    </div>
  )
}