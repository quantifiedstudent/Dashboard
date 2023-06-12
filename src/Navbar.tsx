import TuneIcon from '@mui/icons-material/Tune';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import './css/navbar.css'

interface NavbarProps {
    onPressClose?: () => void;
    onPressOpen: (element: string) => void;
    onPressMore?: () => void;
    openInFull?: boolean;
  }

export default function Navbar({onPressClose, onPressOpen, onPressMore, openInFull = false }: NavbarProps) {
    return (
        <div id="navbar">
            <div id="navbar__section">
                <div id="navbar__section__name">
                    <h1>Quantified Student</h1>
                </div>
                <div id="navbar__section__separator">
                </div>
                <div id="navbar__section__title">
                    <h1>Performance Dashboard</h1>
                </div>
            </div>
            <div id="navbar__icons">
                <div className="navbar__icons__icon" onClick={() => onPressOpen('tune')}><TuneIcon fontSize='inherit'/></div>
                <div className="navbar__icons__icon navbar__icons__icon--small" onClick={() => onPressOpen('peers')}><ChatBubbleIcon fontSize='inherit'/></div>
                <div className="navbar__icons__icon" onClick={() => onPressOpen('notifications')}><NotificationsActiveIcon fontSize='inherit'/></div>
                <div className="navbar__icons__icon" onClick={() => onPressOpen('student')}><PersonIcon fontSize='inherit'/></div>
                {/* <div className="navbar__icons__icon"><AccountCircleIcon fontSize='inherit'/></div> */}
            </div>
        </div>
    )
}