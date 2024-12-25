import { motion } from "motion/react"

export default function IndivTechnology(props: any) {
    return (
        <motion.div variants={{ hidden: {opacity: 0, y: 100},
                                show: {
                                    opacity: 1,
                                    y: 0,
                                } 
                             }}
                    whileHover={{ scale: 1.02 }}
                    initial="hidden"
                    whileInView="show"
                    className="IndivTechnology" >
                    
            <img src={props.img} 
                className="TechnologyImg" />
            <div className="TechnologyText">
                <p className="TechnologyName">{props.text}</p>
                <p className="TechnologyDescription">{props.description}</p>
            </div>
        </motion.div>
    )
}