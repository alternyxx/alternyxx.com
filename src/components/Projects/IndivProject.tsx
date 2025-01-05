import { useState, useEffect, useRef, MouseEvent, ReactElement } from "react"
import { motion } from "motion/react"
import haj from "../../assets/haj.jpg"

import ProjectMedia from "./ProjectMedia"

interface IndivProject {
    projectName: string
    description: string
    images: Array<string>
}

export default function IndivProject(props: IndivProject) {
    const [currentImages, setCurrentImages] = useState(0);

    const lastImage = useRef<HTMLDivElement>(null);
    const nextImage = useRef<HTMLDivElement>(null);

    const images: ReactElement[] = props.images.map<ReactElement>((image, index) => {
        return (
            <ProjectMedia
                media={image}
                type="ProjectSideElement"
                reference={
                    index === currentImages + 1 ? nextImage 
                    : index === currentImages - 1 ? lastImage
                    : null}
            />
        );
    });

    const topArrow = (e: MouseEvent) => {
        e.preventDefault();
        setCurrentImages(prev => prev - 1);
        lastImage.current?.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
    };

    const bottomArrow = (e: MouseEvent) => {
        e.preventDefault();
        setCurrentImages(prev => prev + 1);
        nextImage.current?.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
    };

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
                <ProjectMedia
                    media={props.images[0]}
                    type="ProjectMainElement"
                />
                { /* ~~~~~~~~ Arrows ~~~~~~~~ */ }
                {/* <motion.div className="ProjectArrows"> */}
                <a href="#" onClick={topArrow} className="ProjectTopArrow">
                    <motion.img
                        src={props.images[0]}
                        className="ProjectArrowImage"
                    />
                </a>
                <a href="#" onClick={bottomArrow} className="ProjectBottomArrow">
                    <motion.img
                        src={props.images[0]}
                        className="ProjectArrowImage"
                    />
                </a>
                { /* ~~~~~~~~ Images ~~~~~~~~ */ }
                <motion.div className="ProjectSideElements" >
                    {images}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}