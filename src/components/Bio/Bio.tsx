import { useContext } from "react"
import { motion } from "motion/react"
import { isMobile } from "react-device-detect"
import { StageContext } from "../../common/context"
import haj from "../../assets/haj.webp"
import "./Bio.css"

import {
    sectionVariants,
    elementVarient,
    textVariants,
    noteVarients,
} from "../../common/variants"

export default function Bio() {
    // This should probably be in a useEffect
    const {setStage} = useContext(StageContext);
    let fontSizes = {whileHoverFontSize: "", whileTapFontSize: ""};

    // make this a media query
    if (isMobile) {
        fontSizes.whileHoverFontSize = "13px";
        fontSizes.whileTapFontSize = "13px";
    }
    else {
        fontSizes.whileHoverFontSize = "18.8px";
        fontSizes.whileTapFontSize = "17px";
    }

    return (
        <>
            <motion.div   
                variants={{  
                    hidden: {opacity: 0, y: 100},
                    show: {
                        opacity: 1,
                        y: 0,
                        transition: {staggerChildren: 0.5,}
                    } 
                }}
                initial="hidden"
                whileInView="show"      
                onViewportEnter={() => {setStage(1)}}
                className="Hej" 
            >

                {/* ~~~~~~~~ Avatar Picture ~~~~~~~~ */}
                <motion.img 
                    variants={elementVarient}
                    transition={{ duration: 0.8, }}
                    src={haj}
                    alt="Freedom yearning Blahaj"
                    className="HejAvatar" 
                >
                </motion.img>
                

                {/* ~~~~~~~~ Greeting Message ~~~~~~~~ */}
                <motion.p 
                    variants={elementVarient}
                    transition={{ duration: 2, }}
                    className="HejText" 
                >
                    Hej! I've been working on this as a project during the <span className="Winter">winter</span> holidays!
                </motion.p>


                {/* ~~~~~~~~ Handle ~~~~~~~~ */}
                <motion.p 
                    variants={{ hidden: { opacity: 0, y: -50 },
                                show: { opacity: 1, y: 0 } 
                    }}
                    className="HejHandle" 
                >
                    @alternyxx
                </motion.p>
            </motion.div>
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="show"
                viewport={{margin: "100px"}}
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
                        My name's Nyx and I'm from Myanmar! I'm your average 16 year old with a bit of time in their hands.
                    Back in July of 2024, I had made the unfortunate decision to go down the path of computer science.
                    I started my journey by learning C and Python and worked on a few projects.
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

                    The source code for the entirety of this site can be found on 
                    my github&nbsp;

                    <motion.a 
                        whileHover={{ fontSize: fontSizes.whileHoverFontSize }}
                        whileTap={{ fontSize: fontSizes.whileTapFontSize }}
                        href="https://github.com/alternyxx/alternyxx.com"
                        className="Hyperlink"
                    >
                        here
                    </motion.a>
                    
                    . Thanks for the visit!
                </motion.p>
                
                {/* ~~~~~~~~ Note ~~~~~~~~ */}
                <motion.p 
                    variants={noteVarients}
                    transition={{ duration: 1.5 }}
                    className="BioNote"
                >
                    (I recommend not seeing the source code cuz its a mess :P)
                </motion.p>
            </motion.section>
        </>
    );
}