import { useContext, useState, useEffect, MouseEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import { NavigateFunction, useNavigate, useLocation } from "react-router"
import { DarkModeContext } from "../../common/context"

import icon from "../../assets/Menu.png"
import "./Menu.css"

interface ActivePage {
    navigate: NavigateFunction
    navigation: string
    active: boolean
    page: string
}

const Page = ({navigate, navigation, active, page}: ActivePage) => {
    return (
        <p 
            onClick={(e: MouseEvent) => {
                e.preventDefault();
                navigate(navigation);
                window.scrollTo(0, 0);
            }}
            className="PageButton"
        >
            {
                active ? <>
                    <b><u>{ page }</u></b> •<br/>
                </> : (
                    <b className="PageHover">
                        { page }
                    </b>
                )
            }
        </p>
    );
}

interface Menu {
    bgShow: boolean
    setBgShow: Function
    htmlShow: boolean
    setHtmlShow: Function
    lightbulbEnabled: boolean
    setLightbulbEnabled: Function
}

export default function Menu(props: Menu) {
    const darkMode = useContext(DarkModeContext);

    const navigate = useNavigate();
    const location = useLocation();

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

    // this probably shouldnt be here but idk where else to put it
    useEffect(() => {
        if (location.pathname == "/blahaj") {
            props.setHtmlShow(false);
        }
    }, [location.pathname]);

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
                    style={darkMode ? {
                        color: "#F6F7F9",
					    textShadow: "1px 1px 2px #23272F",
                        backgroundColor: "rgba(0, 0, 0, 0.92)",
                    } : {
                        color: "#23272F",
                        textShadow: "1px 1px 2px #F6F7F9",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                    }}
                >
                    <div className="MenuText">
                        <div className="MenuHeader">
                            Menu~
                        </div>
                        <div className="MenuBody">
                            <Page
                                navigate={navigate}
                                navigation="/"
                                active={
                                    location.pathname == "/" ||
                                    location.pathname == "/blahaj"
                                }
                                page="Home"
                            />
                            <Page
                                navigate={navigate}
                                navigation="/blogs"
                                active={location.pathname.startsWith("/blogs")}
                                page="Blogs"
                            />
                            <Page
                                navigate={navigate}
                                navigation="/portfolio"
                                active={location.pathname.startsWith('/portfolio')}
                                page="Portfolio"
                            />
                        </div>
                        <div className="MenuFooter">
                            <a
                                href="#" 
                                onClick={(e: MouseEvent) => {
                                    e.preventDefault();
                                    props.setLightbulbEnabled((prev: boolean) => !prev);
                                }}
                                className="MenuToggle"
                            >
                                { props.lightbulbEnabled ? "Hide" : "Show"} Lightbulb
                            </a>
                            <br/>
                            <a
                                href="#" 
                                onClick={(e: MouseEvent) => {
                                    e.preventDefault();
                                    props.setBgShow((prev: boolean) => !prev);
                                }}
                                className="MenuToggle"
                            >
                                {props.bgShow ? "Disable" : "Enable"} shaders
                            </a>
                            <br/>
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
                    whileHover={{scale: 1.2, transition: {duration: 0.5, type:"spring"}}}
                    style={{filter: `invert(${darkMode ? 0 : 92}%)`}}
                />
            </motion.a>
        </div>
    );
}