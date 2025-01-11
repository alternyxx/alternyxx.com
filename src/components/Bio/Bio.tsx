import { motion } from "motion/react"
import { isMobile } from "react-device-detect"
import "./Bio.css"

const sectionVariants = { 
    hidden: {opacity: 0, y: 50},
    show: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.5, delayChildren: 1.0, }
    } 
};

const textVariants = { 
    hidden: {opacity: 0, y: 50},
    show: {
        opacity: 1,
        y: 0,
    }
};

const noteVarients = {
    hidden: {opacity: 0, y: 30},
    show: {
        opacity: 1,
        y: 0,
    }
};
                    
export default function Bio() {
    // This should probably be in a useEffect?
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
        <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="show" 
            className="Bio"
        >  
            {/* ~~~~~~~~ Header ~~~~~~~~ */}
            <motion.p 
                variants={textVariants}
                transition={{ duration: 1.5, }} 
                className="BioHeader"
            >
                A Quick Bio ツ
            </motion.p>

            
            {/* ~~~~~~~~ Paragraph One ~~~~~~~~ */}
            <motion.p 
                variants={textVariants}
                transition={{ duration: 1.5, }} 
                      className="BioText" 
            >   
                    Back in July of 2024, I had made the unfortunate decision to go down the path of computer science.
                I started my journey by learning C and Python. I spent hours a day, working on various problem sets
                during my free time, balancing my life with my studies and this newfound 'hobby'. 
                    Then in November, I stumbled upon web development. Though, this site isn't quite traditional.
                You may have noticed the background is quite special. A site called&nbsp;
                <motion.a 
                    whileHover={{ fontSize: fontSizes.whileHoverFontSize }}
                    whileTap={{ fontSize: fontSizes.whileTapFontSize }}
                    href="https://www.shadertoy.com"
                    className="Shadertoy"
                >
                    shadertoy
                </motion.a> 
                &nbsp;had piqued my interest. While I'm of nowhere near as
                creative nor talented as those people, I still tried to create this site as a showcase of all my
                abilities and a culmination of my interests!
            </motion.p>


            {/* ~~~~~~~~ Paragraph Two ~~~~~~~~ */}
            <motion.p
                variants={textVariants}
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

                If you really like any of the 'shaders', I kept them as a standalone without any html at&nbsp;
                
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
                </motion.a>
                
                . Thanks for the visit!
            </motion.p>
            
            {/* ~~~~~~~~ Note ~~~~~~~~ */}
            <motion.p 
                variants={noteVarients}
                transition={{ duration: 1.5 }}
                className="BioNote"
            >
                (You can press ↵ Enter to skip entry :P)
            </motion.p>
        </motion.section>
    );
}