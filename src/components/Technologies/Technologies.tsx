import { motion } from "motion/react"

import "./Technologies.css"
import IndivTechnology from "./IndivTechnology"

/* i should prob use devicons but the load time is insane */
import react from "../../assets/Techstack/react-2.svg"
// import tailwind from "../../assets/tailwind-css-2.svg"
import figma from "../../assets/Techstack/Figma Icon (Full-color).svg"
import typescript from "../../assets/Techstack/typescript.svg"
import webgpu from "../../assets/Techstack/webgpu.svg"
import opengl from "../../assets/Techstack/webgl-logo.svg"
import git from "../../assets/Techstack/Git-Icon-1788C.svg"

import python from "../../assets/Techstack/Python_logo_01.svg"
import c from "../../assets/Techstack/c-1.svg"


const elementVarient = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
};

interface Technologies {
    setStage: Function
}

export default function Technologies({setStage}: Technologies) {
    return (
        <motion.div 
            variants={
                { 
                    hidden: {opacity: 0, y: 50},
                    show: {
                        opacity: 1,
                        y: 0,
                    transition: {delay: 0, staggerChildren: 0.5}
                    } 
                }
            }
            initial="hidden"
            whileInView="show"
            viewport={{margin: "100px 0px 0px 10000px"}}
            onViewportEnter={() => {setStage(3)}}
            className="Technologies"
        >

            {/* ~~~~~~~~ Heading of the whole section ~~~~~~~~ */}
            <motion.p 
                variants={elementVarient}
                className="TechnologiesHeading"
            >
                Current Technologies
            </motion.p>

            {/* ~~~~~~~~ Sub-Heading ~~~~~~~~ */}
            <motion.p 
                variants={elementVarient}
                className="TechnologiesSubHeading"
            >
                Web development with
            </motion.p>

            {/* ~~~~~~~~ Techstack ~~~~~~~~ */}
            <motion.div
                variants={{
                    hidden: {opacity: 0, y: 50},
                    show: {
                        opacity: 1,
                        y: 0,
                    transition: {staggerChildren: 0.3}
                    }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{margin: "100px 0px 0px 10000px"}}
                className="IndivTechnologies"
            >
                <IndivTechnology img={react} text="React" description="UI/UX" />
                {/* <IndivTechnology img={tailwind} text="Tailwind" description="UI/UX" /> I am lazy to learn tailwind LMFAO
                 and i think pure css is better so :P */}
                <IndivTechnology img={figma} text="Figma" description="UI/UX" />
                <IndivTechnology img={typescript} text="Typescript" description="Javascript but better" />
                <IndivTechnology img={webgpu} text="Webgpu" description="2D & 3D Graphics" />
                <IndivTechnology img={opengl} text="WebGL" description="2D & 3D Graphics" />
                <IndivTechnology img={git} text="Git" description="Version Control" />
            </motion.div>

            {/* ~~~~~~~~ Sub-Heading ~~~~~~~~ */}
            <motion.p 
                variants={elementVarient}
                className="TechnologiesSubHeading"
            >
                Other Languages
            </motion.p>

             {/* ~~~~~~~~ Techstack ~~~~~~~~ */}
            <motion.div 
                variants={{
                    hidden: {opacity: 0, y: 50},
                    show: {
                        opacity: 1,
                        y: 0,
                    transition: {staggerChildren: 0.3}
                    }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{margin: "100px 0px 0px 10000px"}}
                className="IndivTechnologies"
            >
                <IndivTechnology img={python} text="Python" description="Two snakes" />
                <IndivTechnology img={c} text="C" description="Segmentation Fault" />
            </motion.div>

        </motion.div>
    )
}