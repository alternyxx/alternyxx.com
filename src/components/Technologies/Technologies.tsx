import { useContext } from "react"
import { motion } from "motion/react"
import { CanvasStateContext } from "../../common/context"
import { elementVarient } from "../../common/variants"
import Screen from "../../common/vertices/Screen"
import tech from "../../common/shaders/tech.wgsl?raw"

import "./Technologies.css"

/* i should prob use devicons but the load time is insane */
import nextjs from "../../assets/Techstack/nextjs-original.svg"
import react from "../../assets/Techstack/react-2.svg"
import tailwind from "../../assets/Techstack/tailwind-css-2.svg"
import typescript from "../../assets/Techstack/typescript.svg"
import webgpu from "../../assets/Techstack/webgpu.svg"
import git from "../../assets/Techstack/Git-Icon-1788C.svg"

import python from "../../assets/Techstack/Python_logo_01.svg"
import c from "../../assets/Techstack/c-1.svg"
import ferris from "../../assets/Techstack/cuddlyferris.svg"

interface IndivTechnology {
    img?: any
    text: string
    description: string
}

export const IndivTechnology = (props: IndivTechnology) => {
    return (
        <motion.div 
            variants={{ 
                hidden: {opacity: 0, y: 100},
                show: {
                    opacity: 1,
                    y: 0,
                }
            }}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 1.02}}
            className="IndivTechnology" 
        >
            { props.img && <img
                src={ props.img }
                className="TechnologyImg"
            /> }
            <div className="TechnologyText">
                <p className="TechnologyName">{props.text}</p>
                <p className="TechnologyDescription">{props.description}</p>
            </div>
        </motion.div>
    )
}

export default function Technologies() {
    const { setCanvasState } = useContext(CanvasStateContext);
    
    return (
        <motion.section
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
            onViewportEnter={() => {
                setCanvasState({
                    vertices: Screen,
                    dimensions: 2,
                    shader: tech,
                });
            }}
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
                <IndivTechnology img={nextjs} text="NextJS" description="Web Dev" />
                <IndivTechnology img={react} text="React" description="Reactive" />
                <IndivTechnology img={tailwind} text="Tailwind" description="UI/UX" /> 
                <IndivTechnology img={typescript} text="Typescript" description="Javascript but better" />
                <IndivTechnology img={webgpu} text="WebGPU" description="2D & 3D Graphics" />
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
                <IndivTechnology img={ferris} text="Rust" description="Best language" />
                <IndivTechnology img={c} text="C" description="Segmentation Fault" />
                <IndivTechnology img={python} text="Python" description="Two snakes" />
            </motion.div>

        </motion.section>
    )
}