import { useState, MouseEvent, ReactElement } from "react"
import { motion } from "motion/react"

import ProjectMedia from "./ProjectMedia"

interface IndivProject {
    projectName: string
    description: string
    images: Array<string>
}

export default function IndivProject(props: IndivProject) {
    const [currentImages, setCurrentImages] = useState([0, 1]);

    const images: ReactElement[] = props.images.map<ReactElement>((image, index) => {
        console.log(currentImages)
        console.log("bruv")
        console.log(currentImages)
        return (
            <ProjectMedia
                media={image}
                type="ProjectImage"
            />
        );
    });

    const topArrow = (e: MouseEvent) => {
        e.preventDefault();
        console.log(currentImages)
        setCurrentImages(prev => prev.map(num => num - 1));
    };

    const bottomArrow = (e: MouseEvent) => {
        e.preventDefault();
        setCurrentImages(prev => prev.map(num => num + 1));
    }

    return (
        <motion.div className="IndivProject">
            <p className="ProjectName">
                {props.projectName}
            </p>
            <p className="ProjectDescription">
                {props.description}
            </p>

            { /* ~~~~~~~~ Media ~~~~~~~~ */ }
            <motion.div className="ProjectShowcase">
                { /* ~~~~~~~~ Video ~~~~~~~~ */ }
                <motion.img
                    src={props.images[0]}
                    className="ProjectVideo"
                />
                { /* ~~~~~~~~ Arrows ~~~~~~~~ */ }
                <motion.div className="ProjectArrows">
                        <a href="#" onClick={topArrow} className="ProjectTopArrow">
                            <motion.img
                                src={props.images[0]}
                                className="ProjectTopArrowImage"
                            />
                        </a>
                        <a href="#" onClick={bottomArrow} className="ProjectBottomArrow">
                            <motion.img
                                src={props.images[0]}
                                className="ProjectBottomArrowImage"
                            />
                        </a>
                </motion.div>
                { /* ~~~~~~~~ Images ~~~~~~~~ */ }
                <motion.div className="ProjectShowcaseLeft" 

                    

            </motion.div>
        </motion.div>
    );
}