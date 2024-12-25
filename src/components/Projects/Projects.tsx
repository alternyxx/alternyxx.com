import { motion } from "motion/react"

import "./Projects.css"
import IndivProject from "./IndivProject"


const elementVarient = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
};

const Rhythm50Description = `
Rhythm50 is a VSRG (Vertically Scrolling Rhythm Game) developed solely by me.
It is developed in pygame-ce and was my submission for the final project of CS50P.
`

export default function Projects() {
    return (
        <motion.div 
            variants={
                { 
                    hidden: {opacity: 0, y: 50},
                    show: {
                        opacity: 1,
                        y: 0,
                    transition: {staggerChildren: 0.5}
                    } 
                }
            }
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="Projects"
        >
            {/* ~~~~~~~~ Heading of the whole section ~~~~~~~~ */}
            <motion.p 
                variants={elementVarient}
                className="ProjectsHeading"
            >
                Highlighted works
            </motion.p>

            <IndivProject 
                projectName="Rhythm50"
                description={Rhythm50Description}
            />
        </motion.div>
    )
}