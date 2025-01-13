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
                boxShadow: darkMode ? "0px 3px 2=1=2px #343A46 inset" : "0px 5px 5px #EBECF0 inset",
            }}
        >
            <div className="FooterHeading">
                Support!
            </div>
            <div className="FooterText">
                <p>
                    It would mean the world to me if you could donate to my patreon below! I can get 5 coffees<br/>
                    with a single $USD and so, would help me immensely!<br>
                    </br>a<br></br>a
                </p>
                Feel free to reach out to me via alternyxx@gmail.com for any questions or inqueries!
            </div>
        </div>
    );
}