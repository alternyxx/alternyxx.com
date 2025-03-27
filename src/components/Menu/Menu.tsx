import { useContext, useState, MouseEvent } from "react"
import { useNavigate } from "react-router"
import { DarkModeContext } from "../../common/context"
import { motion, AnimatePresence } from "motion/react"

import icon from "../../assets/Menu.png"

import "./Menu.css"

interface Menu {
    bgShow: boolean
    setBgShow: Function
    htmlShow: boolean
    setHtmlShow: Function
}

export default function Menu(props: Menu) {
    const darkMode = useContext(DarkModeContext);

    const navigate = useNavigate();

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
                    style={{
                        color: darkMode ? "#F6F7F9" : "#23272F",
					    textShadow: darkMode ? "1px 1px 2px #23272F" : "1px 1px 2px #F6F7F9",
                        backgroundColor: darkMode ? "rgba(0, 0, 0, 0.92)" : "rgba(225, 225, 225, 0.92)"
                    }}
                >
                    <div className="MenuText">
                        <div className="MenuHeader">
                            Menu~
                        </div>
                        <div className="MenuBody">
                            <p 
                                onClick={(e: MouseEvent) => {
                                    e.preventDefault();
                                    navigate("");
                                }}
                                className="Page"
                            >
                                <b><u>Home</u></b> •<br/>
                            </p>
                            <p
                                onClick={(e: MouseEvent) => {
                                    e.preventDefault();
                                    navigate("blogs");
                                }}
                                className="Page"
                            >
                                <b><u>Blogs</u></b> •<br/>
                            </p>
                            <p
                                onClick={(e: MouseEvent) => {
                                    e.preventDefault();
                                    navigate("portfolio");
                                }}
                                className="Page"
                            >
                                <b><u>Portfolio</u></b> •<br/>
                            </p>
                        </div>
                        <div className="MenuFooter">
                            <a 
                                href="#" 
                                onClick={(e: MouseEvent) => {
                                    e.preventDefault();
                                    props.setBgShow((prev: boolean) => !prev);
                                }}
                                className="MenuToggle"
                            >
                                {props.bgShow ? "Disable" : "Enable"} shaders
                            </a><br/>
                            <a 
                                href="#" 
                                onClick={(e: MouseEvent) => {
                                    e.preventDefault();
                                    props.setHtmlShow((prev: boolean) => !prev);
                                }}
                                className="MenuToggle"
                            >
                                {props.htmlShow ? "Disable" : "Enable"} HTML
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
            }
            </AnimatePresence>
            <motion.a href="#">
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
                    whileHover={{scale: 1.1, transition: {duration: 0.4}}}
                    style={{filter: `invert(${darkMode ? 0 : 92}%)`}}
                    />
            </motion.a>
        </div>
    );
}