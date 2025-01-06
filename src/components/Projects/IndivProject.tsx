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
    const [images, setImages] = useState<ReactElement[]>();
    const [currentImage, setCurrentImages] = useState(0);

    const lastImage = useRef<HTMLDivElement>(null);
    const nextImage = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setImages(props.images.map<ReactElement>((image, index) => {
            return (
                <ProjectMedia
                    media={image}
                    key={index}
                    type="ProjectSideElement"
                    reference={
                        index === currentImage + 2 ? nextImage 
                        : index === currentImage - 1 ? lastImage
                        : null}
                    last={lastImage}
                />
            );
        }));
    }, [currentImage])

    const topArrow = (e: MouseEvent) => {
        e.preventDefault();
        lastImage.current?.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
        setCurrentImages(prev => prev - 1);
    };

    const bottomArrow = (e: MouseEvent) => {
        e.preventDefault();
        nextImage.current?.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
        setCurrentImages(prev => prev + 1);
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
                    media={props.images[currentImage]}
                    key={-1}
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