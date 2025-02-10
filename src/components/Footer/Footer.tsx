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
        <footer
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
                    Feel free to reach out to me via nyx@alternyxx.com for any questions or inqueries!
                    <br></br>
                    If you could support me via my patreon below, it'd be greatly appreciated! 
                </p>
                <p>
                </p><br/>
                <a href="https://www.patreon.com/c/alternyxx">
                    <img 
                        src={darkMode ? PatreonWhite : PatreonBlack}
                        className="Patreon"
                    />
                    <img 
                        src={darkMode ? WordmarkWhite : WordmarkBlack}
                        className="Wordmark"
                    />
                </a>
            </div>
        </footer>
    );
}