import { motion } from "motion/react"

import svg from "../../assets/haj.jpg"
import "./Lightbulb.css"
import { MouseEvent } from "react";

interface LightDark {
    darkMode: boolean,
    setDarkMode: any
}

export default function LightDark(props: LightDark) {
    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        props.setDarkMode((prev: boolean) => !prev);
        console.log(props.darkMode);
    };


    return (
        <motion.div className="Lightbulb">
            <motion.a 
                href="#"
                onClick={handleClick}
            >
                <motion.img 
                    src={svg} 
                    alt="Lightbulb"
                    aria-label="Lightbulb to change light mode and dark mode"
                    className="LightbulbImg"
                />
            </motion.a>
        </motion.div>
    );
}