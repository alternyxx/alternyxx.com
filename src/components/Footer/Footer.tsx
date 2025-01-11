import { useContext } from "react";

import { DarkModeContext } from "../../common/context";

import "./Footer.css"

export default function Footer() {
    const darkMode = useContext(DarkModeContext);

    return (
        <div 
            className="Footer"
            style={{
                backgroundColor: darkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)", 
                boxShadow: darkMode ? "0px 2px 5px #343A46 inset" : "0px 5px 5px #EBECF0 inset",
            }}
        >
            <div className="FooterHeading">
                Contacts
            </div>
            <div className="FooterText">
                Feel free to reach out to me via alternyxx@gmail.com for any questions or inqueries!
            </div>
        </div>
    );
}