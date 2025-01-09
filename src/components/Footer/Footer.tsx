import { useContext } from "react";

import { DarkModeContext } from "../../common/context";

import "./Footer.css"

export default function Footer() {
    const darkMode = useContext(DarkModeContext);

    return (
        <div 
            className="Footer"
            style={{backgroundColor: darkMode ? "#070707" : "#E1E1E1"}}
        >
            <div className="FooterText" >
                Contact
            </div>
        </div>
    );
}