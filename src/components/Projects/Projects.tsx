import { motion } from "motion/react"
import IndivProject from "./IndivProject"
import haj from "../../assets/haj.jpg"

import "./Projects.css"
import img from "../../assets/image.png"

const sectionVariants = { 
    hidden: {opacity: 0, y: 50},
    show: {
        opacity: 1,
        y: 0,
    transition: { staggerChildren: 0.5, }
    } 
};

const textVariants = {
    hidden: {opacity: 0, y: 50},
    show: {
        opacity: 1,
        y: 0,
    } 
};

const Rhythm50Description = `
Rhythm50 is a VSRG (Vertically Scrolling Rhythm Game) developed solely by me.
It is developed in pygame-ce and was my submission for the final project of CS50P.
`

export default function Projects() {
    return (
        <motion.section 
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 1.5, }}
            className="Projects"
        >
            <motion.p 
                variants={textVariants}
                transition={{ duration: 1.5, }}
                className="ProjectsHeading"
            >
                Highlighted works
            </motion.p>    
            <IndivProject 
                projectName="Rhythm50"
                description={Rhythm50Description}
                images={[img, haj, img, haj, img, haj, img]}
            />
        </motion.section>
    )
}