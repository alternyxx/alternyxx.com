import { useState, MouseEvent } from "react";
import { motion } from "motion/react";

interface ProjectMedia {
    media: string
    key: number
    type: string
    // im way too tired
    reference?: any
}

export default function ProjectMedia(props: ProjectMedia) {
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
                <a href="#" onClick={handleClick} >
                    { !props.media.endsWith(".mp4") ?
                    <motion.img 
                        whileHover={{
                            scale: 1.01, 
                            transition: {duration: 0.2},
                            borderRadius: "20px",
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
                    props.type == "ProjectMainElement" ? 
                    <video
                        src={props.media}
                        className={props.type}
                        controls
                        controlsList="nodownload nofullscreen noremoteplayback"
                        muted
                        disablePictureInPicture
                        disableRemotePlayback
                        preload=""
                    />
                    :
                    <video
                        src={props.media}
                        className={props.type}
                    />
                    }
                </a>
            </motion.div>
        </>
    );
}