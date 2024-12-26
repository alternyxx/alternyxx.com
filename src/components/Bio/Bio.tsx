import { motion } from "motion/react"
import { isMobile } from "react-device-detect"
import "./Bio.css"

const textVariant = { 
    hidden: {opacity: 0, y: 50},
    show: {
        opacity: 1,
        y: 0,
    }
};
                    
export default function Bio() {
    // This should probably be in a useEffect?
    // But this should never be getting rerendered
    let fontSizes = {whileHoverFontSize: "", whileTapFontSize: ""};
    if (isMobile) {
        // this literally doesnt seem to matter
        fontSizes.whileHoverFontSize = "13px";
        fontSizes.whileTapFontSize = "13px";
    }
    else {
        fontSizes.whileHoverFontSize = "18.8px";
        fontSizes.whileTapFontSize = "17px";
    }

    return (
        <motion.div 
            variants={
                { 
                    hidden: {opacity: 0, y: 50},
                    show: {
                        opacity: 1,
                        y: 0,
                    transition: { staggerChildren: 0.5, delayChildren: 1.0, }
                    } 
                }
            }
            initial="hidden"
            animate="show" 
            className="Bio"
        >  
            {/* ~~~~~~~~ Header ~~~~~~~~ */}
            <motion.p 
                variants={textVariant}
                transition={{ duration: 1.5, }} 
                className="BioHeader"
            >
                A Quick <span className="BioColor">Bio </span>ツ
            </motion.p>


            {/* ~~~~~~~~ Paragraph One ~~~~~~~~ */}
            <motion.p 
                variants={textVariant}
                transition={{ duration: 1.5, }} 
                      className="BioText" 
            >
                I made the unfortunate decision to go down the path of computer science back in July of 2024.
                Even though I do have experience with C and Python (even spending 2 months to develop a rhythm game), 
                I dug myself a deeper hole by now investing my time in the world of Frontend Web Development.
            </motion.p>


            {/* ~~~~~~~~ Paragraph Two ~~~~~~~~ */}
            <motion.p
                variants={textVariant}
                transition={{ duration: 1.5, }} 
                className="BioText"
            >
                Anyhow, This site will mainly serve as a showcase of ongoing and finished projects.
                I'll try my best to create dev logs as blogs here and finished showcases on&nbsp;

                <motion.a 
                    whileHover={{ fontSize: fontSizes.whileHoverFontSize }}
                    whileTap={{ fontSize: fontSizes.whileTapFontSize }}
                    href="https://www.youtube.com/@alternyxx"
                    className="Youtube"
                >
                    Youtube
                </motion.a>. 

                If you really liked the entry, I kept it as a standalone at&nbsp;
                
                <motion.a 
                    whileHover={{ fontSize: fontSizes.whileHoverFontSize }}
                    whileTap={{ fontSize: fontSizes.whileTapFontSize }}
                    href="https://static.alternyxx.com"
                    className="Hyperlink"
                >
                    https://static.alternyxx.com
                </motion.a>

                . And finally, the source code for the entirety of this site can be found on my github at&nbsp;

                <motion.a 
                    whileHover={{ fontSize: fontSizes.whileHoverFontSize }}
                    whileTap={{ fontSize: fontSizes.whileTapFontSize }}
                    href="https://github.com/alternyxx/alternyxx.com"
                    className="Hyperlink"
                >
                    https://github.com/alternyxx/alternyxx.com
                </motion.a>.
            </motion.p>
            
            {/* ~~~~~~~~ Note ~~~~~~~~ */}
            <motion.p variants={{ hidden: {opacity: 0, y: 30},
                                  show: {
                                    opacity: 1,
                                    y: 0,
                                }
                      }}
                      transition={{ duration: 1.5 }}
                      className="BioNote"
            >
                (You can press ↵ Enter to skip entry :P)
            </motion.p>
        </motion.div>
    );
}