import { 
    useContext, 
    useState, 
    useEffect, 
    useRef, 
    MouseEvent, 
    ReactElement, 
    RefObject 
} from "react"

import { motion } from "motion/react"

import { DarkModeContext } from "../../common/context"

import ProjectMedia from "./ProjectMedia"
import Arrow from "../../assets/Arrow.png"

const mainVariants = { 
    hidden: {opacity: 0, y: 50},
    show: {
        opacity: 1,
        y: 0,
    transition: { staggerChildren: 0.5, }
    } 
};

const textVariants = {
    hidden: {opacity: 0, y: 200},
    show: {
        opacity: 1,
        y: 0,
    } 
};

interface IndivProject {
    projectName: string
    description: string
    images: Array<string>
}

export default function IndivProject(props: IndivProject) {
    const darkMode = useContext(DarkModeContext);

    const [images, setImages] = useState<ReactElement[]>();
    const [currentImage, setCurrentImages] = useState(0);
    
    // i literally cant update the RefObjects otherwise so this is the only choice
    // and i just cant be bothered anymore
    const imagesRef = useRef<RefObject<HTMLDivElement>[]>(Array(props.images.length)
        .fill(null).map(() => useRef<HTMLDivElement>(null)));

    useEffect(() => {
        setImages(props.images.map<ReactElement>((image, index) => {
            return (
                <ProjectMedia
                    media={image}
                    key={index}
                    type="ProjectSideElement"
                    reference={imagesRef.current[index] ? imagesRef.current[index] : null}
                />
            );
        }));
    }, []);

    const topArrow = (e: MouseEvent) => {
        e.preventDefault();
        // ugly nested ternaries
        setCurrentImages(prev => prev > 0 ? prev - 1 : props.images.length - 2);
        imagesRef.current[currentImage].current!.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
    };

    const bottomArrow = (e: MouseEvent) => {
        e.preventDefault();
        // ugly nested ternaries
        setCurrentImages(prev => 
            prev < props.images.length - 3
            ? prev + 1 
            : 0
        );
        imagesRef.current[currentImage + 2].current!.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
    };

    return (
        <motion.div 
            className="IndivProject"
        >
            <motion.p 
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0,}}
                transition={{ duration: 1.5, }}
                className="ProjectName"
            >
                {props.projectName}
            </motion.p>

            <motion.p 
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0,}}
                transition={{ duration: 1.5, }}
                className="ProjectDescription"
            >
                {props.description}
            </motion.p>

            { /* ~~~~~~~~ Media ~~~~~~~~ */ }
            <motion.div className="ProjectShowcase">
                { /* ~~~~~~~~ Video ~~~~~~~~ */ }
                <ProjectMedia
                    media={props.images[currentImage]}
                    key={-1}
                    type="ProjectMainElement"
                    reference={null}
                />
                { /* ~~~~~~~~ Arrows ~~~~~~~~ */ }
                <motion.a 
                    href="#" 
                    onClick={topArrow} 
                    className="ProjectTopArrow"
                    style={{filter: `invert(${darkMode ? 0 : 100}%)`}}
                >
                    <motion.img
                        whileHover={{backgroundColor: "#000000", scale: 1.1}}
                        src={Arrow}
                        className="ProjectArrowImage"
                        />
                </motion.a>

                <motion.a 
                    href="#" 
                    onClick={bottomArrow} 
                    className="ProjectBottomArrow"
                    style={{filter: `invert(${darkMode ? 0 : 100}%)`}}
                    >
                    <motion.img
                        whileHover={{scale: 1.1}}
                        src={Arrow}
                        className="ProjectArrowImage"
                    />
                </motion.a>
                { /* ~~~~~~~~ Images ~~~~~~~~ */ }
                <motion.div className="ProjectSideElements" >
                    {images}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}