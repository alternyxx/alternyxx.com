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

interface IndivProject {
    projectName: string
    description: string
    media: Array<string>
};

export default function IndivProject(props: IndivProject) {
    const darkMode = useContext(DarkModeContext);

    const [images, setImages] = useState<ReactElement[]>();
    const [currentImage, setCurrentImages] = useState(0);
    
    // i literally cant update the RefObjects otherwise so this is the only choice
    // and i just cant be bothered anymore
    const imagesRef = useRef<RefObject<HTMLDivElement>[]>(Array(props.media.length)
        .fill(null).map(() => useRef<HTMLDivElement>(null)));

    useEffect(() => {
        setImages(props.media.map<ReactElement>((image, index) => {
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
        setCurrentImages(prev => 
            prev != 0 ? 
            prev - 1 
            : props.media.length - 1
        );
        imagesRef.current[currentImage != 0 ? currentImage - 1 : props.media.length - 1].current!.scrollIntoView(
            {behavior: "smooth", block: "nearest", inline: "nearest"}
        );
    };

    const bottomArrow = (e: MouseEvent) => {
        e.preventDefault();
        imagesRef.current[currentImage != props.media.length - 1 ? currentImage + 1 : 0].current!.scrollIntoView(
            {behavior: "smooth", block: "nearest", inline: "nearest"}
        );
        // ugly nested ternaries and state is so weird
        setCurrentImages(prev => 
            prev != props.media.length - 1
            ? prev + 1
            : 0
        );
    };

    return (
        <motion.div 
            className="IndivProject"
        >
            <motion.p 
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0,}}
                viewport={{margin: "200px 0px 0px 0px"}}
                transition={{ duration: 1.5, }}
                className="ProjectName"
            >
                {props.projectName}
            </motion.p>

            <motion.p 
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0,}}
                viewport={{margin: "200px 0px 0px 0px"}}
                transition={{ duration: 1.5, }}
                className="ProjectDescription"
            >
                {props.description}
            </motion.p>

            { /* ~~~~~~~~ Media ~~~~~~~~ */ }
            <motion.div className="ProjectShowcase">
                { /* ~~~~~~~~ Video ~~~~~~~~ */ }
                <ProjectMedia
                    media={props.media[currentImage]}
                    key={-1}
                    type="ProjectMainElement"
                    reference={null}
                />
                { /* ~~~~~~~~ Arrows ~~~~~~~~ */ }
                <motion.a 
                    href="#" 
                    onClick={topArrow} 
                    className="ProjectTopArrow"
                >
                    <motion.img
                        initial={{
                            backgroundColor: "transparent",
                            scale: 1,
                            filter: `invert(${darkMode ? 30 : 80}%)`
                        }}
                        whileHover={{
                            backgroundColor: "#000000", 
                            scale: 1.1, 
                            filter: `invert(${darkMode ? 100 : 0}%)`,
                        }}
                        whileTap={{
                            backgroundColor: "#000000",
                            scale: 0.95,
                            filter: `invert(${darkMode ? 100 : 0}%)`,
                        }}
                        src={Arrow}
                        className="ProjectArrowImage"
                        style={{filter: `invert(${darkMode ? 30 : 80}%)`}}
                    />
                </motion.a>

                <motion.a 
                    href="#" 
                    onClick={bottomArrow} 
                    className="ProjectBottomArrow"
                    >
                    <motion.img
                        initial={{
                            backgroundColor: "transparent",
                            scale: 1,
                            filter: `invert(${darkMode ? 30 : 80}%)`
                        }}
                        whileHover={{
                            backgroundColor: "#000000", 
                            scale: 1.1, 
                            filter: `invert(${darkMode ? 100 : 0}%)`,
                        }}
                        whileTap={{
                            backgroundColor: "#000000",
                            scale: 0.95,
                            filter: `invert(${darkMode ? 100 : 0}%)`,
                        }}
                        src={Arrow}
                        className="ProjectArrowImage"
                        style={{filter: `invert(${darkMode ? 30 : 80}%)`}}
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