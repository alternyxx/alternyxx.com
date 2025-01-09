import { motion } from "motion/react"
import haj from "../../assets/haj.jpg"
import "./Hej.css"

const elementVarient = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

export default function Hej() {
    return (
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
            animate="show"      
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
    );
}