import { 
    useState,
    Dispatch,
    SetStateAction,
} from "react"
import { Outlet } from "react-router";
import { DarkModeContext } from "./common/context";

import Menu from './components/Menu/Menu'
import Lightbulb from './components/Lightbulb/Lightbulb'
import Footer from "./components/Footer/Footer"; // i hate the way ive done the css

interface Lightbulb {
    enabled: boolean,
    lowHanging: boolean,
}

interface Layout {
    device: GPUDevice | undefined,
    bgShow: boolean,
    setBgShow: Dispatch<SetStateAction<boolean>>,
    darkMode: boolean,
    setDarkMode: Dispatch<SetStateAction<boolean>>,
    menu?: boolean,
    lightbulb?: Lightbulb,
    footer?: boolean,
}

export default function Layout({
    device,
    bgShow,
    setBgShow,
    darkMode,
    setDarkMode,
    menu,
    lightbulb,
    footer,
}: Layout) {
    const [htmlShow, setHtmlShow] = useState(true);
    const [lightbulbEnabled, setLightbulbEnabled] = useState(true);

    return (
        <div
            style={{
                color: darkMode ? "#F6F7F9" : "#23272F",
                textShadow: darkMode ? "1px 1px 2px #23272F" : "1px 1px 2px #F6F7F9",
                backgroundColor: device && bgShow ? "transparent" : darkMode ? "#000000" : "#FAFAFA",
                visibility: htmlShow ? "visible" : "hidden"
            }}
            className="Layout"
        >
            <DarkModeContext.Provider value={darkMode}>
                { menu && <Menu
                    bgShow={ bgShow }
                    setBgShow={ setBgShow }
                    htmlShow={ htmlShow }
                    setHtmlShow={ setHtmlShow }
                    lightbulbEnabled={ lightbulbEnabled }
                    setLightbulbEnabled={ setLightbulbEnabled }
                /> }
                { lightbulb?.enabled && <Lightbulb
                    setDarkMode={ setDarkMode }
                    lowHanging={ lightbulb?.lowHanging }
                /> } 
                <Outlet/>
                { footer && <Footer/> }
            </DarkModeContext.Provider>
        </div>
    )
}