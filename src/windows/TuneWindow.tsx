import { useState } from "react";
import BrightnessHighRoundedIcon from '@mui/icons-material/BrightnessHighRounded';
import Brightness2RoundedIcon from '@mui/icons-material/Brightness2Rounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import Colours from "../css/Colours";

export default function TuneWindow() {
    const [colourSet, setColourSet] = useState('dark');

    const toggleDarkMode = (colourPallete: string) => {
        setColourSet(colourPallete);
        switch (colourPallete) {
            case "dark":
                document.documentElement.style.setProperty('--main1', Colours.main1Dark);
                document.documentElement.style.setProperty('--main2', Colours.main2Dark);
                document.documentElement.style.setProperty('--background', Colours.backgroundDark);
                document.documentElement.style.setProperty('--font-colour', Colours.fontColourDark);
                break;
            case "light":
                document.documentElement.style.setProperty('--main1', Colours.main1Light);
                document.documentElement.style.setProperty('--main2', Colours.main2Light);
                document.documentElement.style.setProperty('--background', Colours.backgroundLight);
                document.documentElement.style.setProperty('--font-colour', Colours.fontColourLight);
                break;
            case "user":
                document.documentElement.style.setProperty('--main1', "#232323");
                document.documentElement.style.setProperty('--main2', "#efefef");
                document.documentElement.style.setProperty('--background', "#101010");
                document.documentElement.style.setProperty('--font-colour', "#efefef");
                break;
            default:
                document.documentElement.style.setProperty('--main1', Colours.main1Dark);
                document.documentElement.style.setProperty('--main2', Colours.main2Dark);
                document.documentElement.style.setProperty('--background', Colours.backgroundDark);
                document.documentElement.style.setProperty('--font-colour', Colours.fontColourDark);
                break;
        }
    };

    return (
        <div className="tune__window">
            <div onClick={() => toggleDarkMode('dark')} className="navbar__icons__icon">
                <Brightness2RoundedIcon fontSize='inherit'/>
            </div>
            <div onClick={() => toggleDarkMode('light')} className="navbar__icons__icon">
                <BrightnessHighRoundedIcon fontSize='inherit'/>
            </div>
            <div onClick={() => toggleDarkMode('user')} className="navbar__icons__icon">
                <PaletteRoundedIcon fontSize='inherit'/>
            </div>
        </div>
    );
}