import { useState, MouseEvent } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react"

import Handle from "../../assets/DarkHandle.png"
import Bulb from "../../assets/DarkBulb.png"

import "./Lightbulb.css"

interface LightDark {
    darkMode: boolean
    setDarkMode: any
}

export default function LightDark(props: LightDark) {
    const [handle, setHandle] = useState<number>(0);
    const { scrollY } = useScroll();

    const scroll = useSpring(scrollY);

    useMotionValueEvent(scrollY, "change", current => {
        if (current > window.innerHeight) {
            // set to window height
            scroll.set(window.innerHeight);
        } else {
            setHandle(current - 100);
            scroll.set(current - 20);
        }
    });

    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        props.setDarkMode((prev: boolean) => !prev);
    };

    return (
        <>
            <motion.div
                className="LightbulbText"
                style={{ color: props.darkMode ? "#777777" : "#888888"}}
            >
                <motion.p className="LightbulbMainText">
                    | Lighting
                </motion.p>
                <motion.p className="LightbulbNote">
                    (ps: plz dont spam)
                </motion.p>
                <motion.p className="LightbulbNote">
                    (it CAN break)
                </motion.p>
            </motion.div>

            <motion.img
                src={Handle}
                className="LightbulbHandle"
                style={{
                    filter: `invert(${props.darkMode ? 0 : 100}%)`,
                    top: handle
                }}
            />

            <motion.div 
                className="Lightbulb"
                style={{ top: scroll }}
            >   
                <motion.a 
                    href="#"
                    onClick={handleClick}
                >
                    <motion.img
                        src={Handle}
                        className="LightbulbImg"
                        style={{filter: `invert(${props.darkMode ? 0 : 100}%)`}}
                    />
                    <motion.img 
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.96}}
                        src={Bulb} 
                        alt="Lightbulb"
                        aria-label="Lightbulb to change light mode and dark mode"
                        className="LightbulbImg"
                        style={{filter: `invert(${props.darkMode ? 0 : 100}%)`}}
                    />
                </motion.a>
            </motion.div>
        </>
    );
}