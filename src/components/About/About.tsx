import { motion } from "motion/react"
import haj from "../../assets/haj.jpg"
import "./About.css"

export default function About() {
    return (
        <motion.div 
            variants={{ hidden: {opacity: 0},
                        show: {
                            opacity: 1,
                            transition: {staggerChildren: 0.8,}
                            } 
            }}
            initial="hidden"
            animate="show"           
            className="About" >

            <motion.img src={haj}
                variants={{ hidden: { opacity: 0 },
                            show: { opacity: 1 } 
                }}
                 alt="Freedom yearning Blahaj"
                 className="AboutAvatar" >
            </motion.img>
            <motion.p 
            variants={{ hidden: { opacity: 0 },
                        show: { opacity: 1 } 
            }}
            className="AboutText1">
                Hej! I've been working on this as a project during the winter holidays!
            </motion.p>
            <motion.p 
            variants={{ hidden: { opacity: 0 },
                        show: { opacity: 1 } 
            }}
            className="AboutHandle">
                @alternyxx
            </motion.p>

        </motion.div>
    )
}