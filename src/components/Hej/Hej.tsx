import { motion } from "motion/react"
import haj from "../../assets/haj.jpg"
import "./Hej.css"

const containerVarient = {  
    hidden: {opacity: 0, y: 100},
    show: {
        opacity: 1,
        y: 0,
        transition: {staggerChildren: 1,}
    } 
};

const elementVarient = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

export default function Hej() {
    return (
        <motion.div 
            variants={containerVarient}
            initial="hidden"
            animate="show"           
            className="Hej" >

            {/* ~~~~~~~~ Avatar Picture ~~~~~~~~ */}
            <motion.img 
                initial={{ opacity: 0, rotate: "360deg", scale: 1.2 }}
                animate={{ opacity: 1, rotate: ["360deg", "180deg", "90deg", "45deg", "0deg", "-10deg", "0deg", "0deg", "0deg", "0deg"], scale: 1 }}
                transition={{ duration: 2, ease: "backIn" }}
                layout
                src={haj}
                alt="Freedom yearning Blahaj"
                className="HejAvatar" >
            </motion.img>
            

            {/* ~~~~~~~~ Greeting Message ~~~~~~~~ */}
            <motion.p 
                variants={elementVarient}
                transition={{ duration: 2, }}
                className="HejText" >
                Hej! I've been working on this as a project during the <span className="Winter">winter</span> holidays!
            </motion.p>


            {/* ~~~~~~~~ Handle ~~~~~~~~ */}
            <motion.p 
                variants={{ hidden: { opacity: 0, y: -50 },
                            show: { opacity: 1, y: 0 } 
                }}
                className="HejHandle" >
                @alternyxx
            </motion.p>

        </motion.div>
    )
}