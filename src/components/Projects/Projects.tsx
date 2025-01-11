import { motion } from "motion/react"
import IndivProject from "./IndivProject"
import haj from "../../assets/haj.jpg"

import "./Projects.css"
import img from "../../assets/image.png"

// i'll make these a seperate folder down the line
const Rhythm50Description = `
Rhythm50 is a VSRG (Vertically Scrolling Rhythm Game) developed solely by me.
It is developed in pygame-ce and was my submission for the final project of CS50P.
Later down the line, when I have more free time, I plan to repurpose the game as
a more fleshed-out rhythm game with my own custom music.
`

export default function Projects() {
    return (
        <motion.section 
            className="Projects"
        >
            <motion.p 
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0,}}
                transition={{ duration: 1.5, }}
                className="ProjectsHeading"
            >
                Highlighted works
            </motion.p>    
            <IndivProject 
                projectName="Rhythm50"
                description={Rhythm50Description}
                images={[haj, haj, haj]}
            />
        </motion.section>
    )
}