import { useState, useEffect, MouseEvent } from "react";
import { motion } from "motion/react"

import Handle from "../../assets/DarkHandle.png"
import Bulb from "../../assets/DarkBulb.png"

import "./Lightbulb.css"

interface LightDark {
    darkMode: boolean,
    setDarkMode: any
}

export default function LightDark(props: LightDark) {
    const [inversion, setInversion] = useState(props.darkMode ? 0 : 100);
    
    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        props.setDarkMode((prev: boolean) => !prev);
    };

    console.log("this is rerendering")

    return (
        <motion.div className="Lightbulb">
            <motion.a 
                href="#"
                onClick={handleClick}
            >
                <motion.img
                    src={Handle}
                    className="LightbulbImg"
                    style={{filter: `invert(${inversion}%)`}}
                />
                <motion.img 
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.96}}
                    src={Bulb} 
                    alt="Lightbulb"
                    aria-label="Lightbulb to change light mode and dark mode"
                    className="LightbulbImg"
                    style={{filter: `invert(${inversion}%)`}}
                />
            </motion.a>
        </motion.div>
    );
}