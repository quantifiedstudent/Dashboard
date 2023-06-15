import Cookies from "universal-cookie";
import Colours from "./css/Colours";
import { UserColourPalette } from "./windows/TuneWindow";

export default function ThemeHelper(){
    const cookies = new Cookies();
    const savedPreferredColourPalette = cookies.get("preferredColourPalette")
    
    switch (savedPreferredColourPalette) {
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
            const savedUserColourPalette = cookies.get("userColourPalette")
            const userColourPalette: UserColourPalette = savedUserColourPalette ? savedUserColourPalette : new UserColourPalette();
        
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
};