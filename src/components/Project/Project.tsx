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
import Arrow from "../../assets/Arrow.png"
import "./Project.css"

interface ProjectMedia {
    media: string
    thumbnail?: string
    key: number
    type: string
    // im way too tired
    reference?: any
}

interface Project {
    projectName: string
    description: string
    media: Array<string>
    thumbnails: Array<string> // the videos should always come before images
};

const ProjectMedia = (props: ProjectMedia) => {
    const [active, setActive] = useState(false);

    // two functions for this is unnecessary but dont fix whats not broken
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        document.body.style.overflow = "hidden";
        setActive(true);
    };

    const unfocus = (e: MouseEvent) => {
        e.preventDefault();
        document.body.style.overflow = "visible";
        setActive(false);
    }
    
    return (
        <>  
            {/* honestly backdrop should be done in the parent indiv project project component */}
            { active === true &&
                <motion.div className="backdrop">
                    { !props.media.endsWith(".mp4") ?
                    <img
                        src={props.media}
                        className="ProjectMediaActive"
                    />
                    :
                    <video
                        src={props.media}
                        className="ProjectMediaActive"
                        controls
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                    />
                }
                    <button className="ProjectMediaFocus" onClick={unfocus} />
                </motion.div>
            }
            <motion.div
                initial={{scale: 0}}
                whileInView={{scale: 1}}
                viewport={{margin: "400px 0px 0px 0px"}}
                transition={{duration: 0.6}}
                className="ProjectMedia" 
                ref={props.reference ? props.reference : null} 
            >
                <a href="#" onClick={handleClick} draggable="false" >
                    { !props.media.endsWith(".mp4") ?
                    <motion.img 
                        whileHover={{
                            scale: 1.01, 
                            transition: {duration: 0.2},
                            borderRadius: "0px",
                        }}
                        whileTap={{
                            scale: 0.99,
                            transition: {duration: 0.2},
                            borderRadius: "45px",
                        }}
                        src={props.media}
                        className={props.type}
                    />
                    :
                    props.type === "ProjectMainElement" ? 
                    <video
                        src={props.media}
                        className={props.type}
                        poster={props.thumbnail}
                        controls
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        preload=""
                        />
                    :
                    <motion.video
                        whileHover={{
                            scale: 1.01, 
                            transition: {duration: 0.2},
                            borderRadius: "0px",
                        }}
                        whileTap={{
                            scale: 0.99,
                            transition: {duration: 0.2},
                            borderRadius: "45px",
                        }}
                        src={props.media}
                        className={props.type}
                        poster={props.thumbnail}
                    />
                    }
                </a>
            </motion.div>
        </>
    );
}

export default function Project(props: Project) {
    const darkMode = useContext(DarkModeContext);

    const [media, setMedia] = useState<ReactElement[]>();
    const [currentImage, setCurrentImages] = useState(0);
    
    // i literally cant update the RefObjects otherwise so this is the only choice
    // and i just cant be bothered anymore
    const imagesRef = useRef<RefObject<HTMLDivElement>[]>(Array(props.media.length)
        .fill(null).map(() => useRef<HTMLDivElement>(null)));

    useEffect(() => {
        setMedia(props.media.map<ReactElement>((image, index) => {
            return (
                <ProjectMedia
                    media={image}
                    thumbnail={image.endsWith("mp4") ? props.thumbnails[index]! : ''}
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
            {behavior: "smooth", block: "center", inline: "nearest"}
        );
    };

    const bottomArrow = (e: MouseEvent) => {
        e.preventDefault();
        imagesRef.current[currentImage != props.media.length - 1 ? currentImage + 1 : 0].current!.scrollIntoView(
            {behavior: "smooth", block: "center", inline: "nearest"}
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
                            backgroundColor: "rgba(0, 0, 0, 0)",
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
                    {media}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}