import { motion } from "motion/react"

interface IndivProject {
    projectName: string
    description: string
}

export default function IndivProject(props: IndivProject) {
    return (
        <motion.div className="IndivProject">
            <p className="ProjectName">
                {props.projectName}
            </p>
            <p className="ProjectDescription">
                {props.description}
            </p>
            
        </motion.div>
    )
}