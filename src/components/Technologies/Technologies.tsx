import { motion } from "motion/react"

import "./Technologies.css"
import IndivTechnology from "./IndivTechnology"

import react from "../../assets/Techstack/react-2.svg"
// import tailwind from "../../assets/tailwind-css-2.svg"
// import figma from "../../assets/Figma Icon (Full-color).svg"
import framermotion from "../../assets/Techstack/framer-motion.svg"
import typescript from "../../assets/Techstack/typescript.svg"
import webgpu from "../../assets/Techstack/webgpu.svg"
import opengl from "../../assets/Techstack/webgl-logo.svg"
import git from "../../assets/Techstack/Git-Icon-1788C.svg"

import python from "../../assets/Techstack/Python_logo_01.svg"
import c from "../../assets/Techstack/c-1.svg"

export default function Technologies() {
    return (
        <motion.div 
            variants={{ 
                hidden: {opacity: 0, y: 50},
                show: {
                    opacity: 1,
                    y: 0,
                transition: {staggerChildren: 2}
                } 
            }}
            initial="hidden"
            whileInView="show"
            className="Technologies"
        >
            <p className="TechnologiesHeading">Current Technologies</p>
            <p className="TechnologiesSubHeading">
                Frontend Developer With
            </p>
            <motion.div
                variants={{
                    hidden: {opacity: 0, y: 50},
                    show: {
                        opacity: 1,
                        y: 0,
                    transition: {staggerChildren: 2}
                    }
                }}
                initial="hidden"
                whileInView="show"
                className="IndivTechnologies"
            >
                <IndivTechnology img={react} text="React" description="UI/UX" />
                {/* <IndivTechnology img={tailwind} text="Tailwind" description="UI/UX" /> I am lazy to learn tailwind LMFAO
                 and i think pure css is better so :P */}
                <IndivTechnology img={framermotion} text="Motion" description="Animations" />
                <IndivTechnology img={typescript} text="Typescript" description="Javascript but better" />
                <IndivTechnology img={webgpu} text="Webgpu" description="2D & 3D Graphics" />
                <IndivTechnology img={opengl} text="WebGL" description="2D & 3D Graphics" />
                <IndivTechnology img={git} text="Git" description="Version Control" />
            </motion.div>
            <p className="TechnologiesSubHeading">
                Other Languages
            </p>
            <div className="IndivTechnologies">
                <IndivTechnology img={python} text="Python" description="Two snakes" />
                <IndivTechnology img={c} text="C" description="Segmentation Fault" />
            </div>
        </motion.div>
    )
}