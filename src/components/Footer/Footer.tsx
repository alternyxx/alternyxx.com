import { useContext } from "react";

import { DarkModeContext } from "../../common/context";

import WordmarkWhite from "../../assets/PATREON_WORDMARK_1_WHITE_RGB.svg"
import WordmarkBlack from "../../assets/PATREON_WORDMARK_1_BLACK_RGB.svg"
import PatreonWhite from "../../assets/PATREON_SYMBOL_1_WHITE_RGB.svg"
import PatreonBlack from "../../assets/PATREON_SYMBOL_1_BLACK_RGB.svg"
import "./Footer.css"

export default function Footer() {
    const darkMode = useContext(DarkModeContext);

    return (
        <div 
            className="Footer"
            style={{
                backgroundColor: darkMode ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.8)", 
                boxShadow: darkMode ? "0px 3px 2px #343A46 inset" : "0px 5px 5px #EBECF0 inset",
            }}
        >
            <div className="FooterHeading">
                Support!
            </div>
            <div className="FooterText">
                <p>
                    It would mean the world to me if you could support me! 
                    A single $USD can get me 5 coffees where i live :D.
                </p>
                <a href="https://www.patreon.com/c/alternyxx">
                    <img 
                        src={darkMode ? PatreonWhite : PatreonBlack}
                        className="Patreon"
                    />
                    <img 
                        src={darkMode ? WordmarkWhite : WordmarkBlack}
                        className="Wordmark"
                    />
                </a><br /><br /><br />
                Feel free to reach out to me via alternyxx@gmail.com for any questions or inqueries!
            </div>
        </div>
    );
}