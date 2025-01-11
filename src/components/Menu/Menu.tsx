import { useContext, useState, MouseEvent } from "react"
import { DarkModeContext } from "../../common/context"
import { motion, AnimatePresence } from "motion/react"

import icon from "../../assets/Menu.png"

import "./Menu.css"

interface Menu {
    bgShow: boolean
    setBgShow: Function
}
export default function Menu(props: Menu) {
    const darkMode = useContext(DarkModeContext);

    const [menuShown, setMenuShown] = useState(false);

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        setMenuShown(prev => {
            if (prev) {
                document.body.style.overflow = "visible";
            } else {
                document.body.style.overflow = "clip";
            }
            return !prev;
        });
    };
    
    return (
        <div className="Menu">
            <AnimatePresence>
            { menuShown &&
            <div className="MenuShown">
                <motion.div 
                    initial={{x: -320}}
                    animate={{x: 0}}
                    exit={{x: -320}}
                    transition={{duration: 0.2}}
                    className="MenuExpanded"
                    style={{backgroundColor: darkMode ? "rgba(0, 0, 0, 0.92)" : "rgba(225, 225, 225, 0.92)"}}
                >
                    <div className="MenuText">
                        <div className="MenuHeader">
                            Menu~
                        </div>
                        <div className="MenuBody">
                            <p>
                                <b><u>Home</u></b> •<br />
                            </p>
                            <p>
                                <u>Projects</u>
                            </p>
                        </div>
                        <div className="MenuFooter">
                            <a 
                                href="#" 
                                onClick={(e: MouseEvent) => {
                                    e.preventDefault();
                                    props.setBgShow((prev: boolean) => !prev);
                                }}
                                className="BackgroundDisable"
                            >
                                Disable Background
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
            }
            </AnimatePresence>
            <a href="#">
                <motion.img 
                    variants={{
                        initial: {x: 0},
                        expanded: {x: 150}
                    }}
                    initial="initial"
                    animate={!menuShown ? "" : "expanded"}
                    src={icon} 
                    className="MenuIcon" 
                    onClick={handleClick}
                    style={{filter: `invert(${darkMode ? 0 : 92}%)`}}
                    />
            </a>
        </div>
    );
}