import { useEffect, useState } from "react";
import BrightnessHighRoundedIcon from '@mui/icons-material/BrightnessHighRounded';
import Brightness2RoundedIcon from '@mui/icons-material/Brightness2Rounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ColorResult, ChromePicker } from "react-color";
import Colours, { invertColor } from "../css/Colours";
import Cookies from "universal-cookie";

type ColourPaletteTypes = "main1"|"main2"|"background"|"fontColour";

export class UserColourPalette {
    public "main1": string = "#232323";
    public "main2": string = "#efefef";
    public "background": string = "#101010";
    public "fontColour": string = "#efefef";

    // constructor(main1: string, main2: string, background: string, fontColour: string){
    //     this.main1 = main1;
    //     this.main2 = main2;
    //     this.background = background;
    //     this.fontColour = fontColour;
    // }
}

export default function TuneWindow() {
    const cookies = new Cookies();

    const savedPreferredColourPalette = cookies.get("preferredColourPalette")

    const savedUserColourPalette = cookies.get("userColourPalette")

    const [preferredColourPalette, setPreferredColourPalette] = useState(savedPreferredColourPalette ? savedPreferredColourPalette : 'dark');
    const [userColourPalette, setUserColourPalette] = useState(savedUserColourPalette ? savedUserColourPalette : new UserColourPalette());
    const [showColourPicker, setShowColourPicker] = useState(false);
    const [colourToChange, setColourToChange] = useState<ColourPaletteTypes>("main1");
    
    useEffect(() => {
        changeColourPalette(preferredColourPalette);
    }, [userColourPalette]);

    const changeColourPalette = (newColourPalette: string) => {
        setPreferredColourPalette(newColourPalette);
        switch (newColourPalette) {
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
                document.documentElement.style.setProperty('--main1', userColourPalette.main1);
                document.documentElement.style.setProperty('--main2', userColourPalette.main2);
                document.documentElement.style.setProperty('--background', userColourPalette.background);
                document.documentElement.style.setProperty('--font-colour', userColourPalette.fontColour);
                break;
            default:
                document.documentElement.style.setProperty('--main1', Colours.main1Dark);
                document.documentElement.style.setProperty('--main2', Colours.main2Dark);
                document.documentElement.style.setProperty('--background', Colours.backgroundDark);
                document.documentElement.style.setProperty('--font-colour', Colours.fontColourDark);
                break;
        }
        cookies.set('preferredColourPalette', JSON.stringify(newColourPalette), { path: '/' });
    };

    const enableColourPicker = (colour: ColourPaletteTypes) => {
            setShowColourPicker(true);
            setColourToChange(colour)
    };

    function ColourPicker({ colourToChange }: { colourToChange: ColourPaletteTypes }) {
        const changeUserColour = (newColour: ColorResult) => {
            const newUserColourPalette = structuredClone(userColourPalette);
            newUserColourPalette[colourToChange] = newColour.hex;
            setUserColourPalette(newUserColourPalette);
            cookies.set('userColourPalette', JSON.stringify(newUserColourPalette), { path: '/' });
        };

        return (
            <div className="colour-picker">
                <ChromePicker color={userColourPalette[colourToChange]} onChangeComplete={changeUserColour} disableAlpha={true}/>
                <div className="colour-picker__close" onClick={() => { setShowColourPicker(false) }}><CloseRoundedIcon /></div>
            </div>
        )
    }

    return (
        <div className="tune__window">
            <div className="theme-picker">
                <div onClick={() => changeColourPalette('dark')} className="navbar__icons__icon">
                    <Brightness2RoundedIcon fontSize='inherit' />
                </div>
                <div onClick={() => changeColourPalette('light')} className="navbar__icons__icon">
                    <BrightnessHighRoundedIcon fontSize='inherit' />
                </div>
                <div onClick={() => changeColourPalette('user')} className="navbar__icons__icon">
                    <PaletteRoundedIcon fontSize='inherit' />
                </div>
            </div>
            <div className="user-colours">
                <div className="colours">Set main1 <div className="colour-circle" style={{background: userColourPalette["main1"], borderColor: invertColor(userColourPalette["main1"])}} onClick={() => enableColourPicker("main1")} /></div>
                <div className="colours">Set main2 <div className="colour-circle" style={{background: userColourPalette["main2"], borderColor: invertColor(userColourPalette["main2"])}} onClick={() => enableColourPicker("main2")} /></div>
                <div className="colours">Set background <div className="colour-circle" style={{background: userColourPalette["background"], borderColor: invertColor(userColourPalette["background"])}} onClick={() => enableColourPicker("background")} /></div>
                <div className="colours">Set font-colour <div className="colour-circle" style={{background: userColourPalette["fontColour"], borderColor: invertColor(userColourPalette["fontColour"])}} onClick={() => enableColourPicker("fontColour")} /></div>
            </div>
            {showColourPicker && <ColourPicker colourToChange={colourToChange} />}
        </div>
    );
}
