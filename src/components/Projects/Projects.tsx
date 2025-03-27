import { useContext } from "react"
import { StageContext } from "../../common/context"
import { motion } from "motion/react"
import IndivProject from "./IndivProject"

import "./Projects.css"

// i'll make these a seperate folder down the line
const Rhythm50Description = `
Rhythm50 is a VSRG (Vertically Scrolling Rhythm Game) developed solely by me.
It is developed in pygame-ce and was my submission for the final project of CS50P.
Later down the line, when I have more free time, I plan to repurpose the game as
a more fleshed-out rhythm game with my own custom music.
`

interface Projects {
    reference: any 
}

export default function Projects({reference}: Projects) {
    const {setStage} = useContext(StageContext);
    
    return (
        <motion.section
            className="Projects"
            viewport={{amount: 0.25}}
            onViewportEnter={() => {setStage(2)}}
            ref={reference}
        >
            <motion.p 
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0,}}
                viewport={{margin: "200px 0px 0px 0px"}}
                transition={{ duration: 1.5, }}
                className="ProjectsHeading"
            >
                Highlighted works
            </motion.p>    
            <IndivProject 
                projectName="Rhythm50"
                description={Rhythm50Description}
                media={[
                    "https://static.alternyxx.com/mp4/ByYourSide.mp4", 
                    "https://static.alternyxx.com/mp4/NacreousSnowmelt.mp4",
                    "https://static.alternyxx.com/png/ByYourSidePaused.png",
                    "https://static.alternyxx.com/png/NacreousSnowmeltPaused.png"
                ]}
                thumbnails={[
                    "https://static.alternyxx.com/png/ByYourSide.png", 
                    "https://static.alternyxx.com/png/NacreousSnowmelt.png"
                ]}
            />
        </motion.section>
    );
}