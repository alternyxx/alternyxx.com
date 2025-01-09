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
            { active === true &&
                <motion.div className="backdrop">
                    <button className="ProjectMediaFocus" onClick={unfocus} />
                    <img
                        src={props.media}
                        className="ProjectMediaActive"
                    />
                </motion.div>
            }
            <motion.div
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{duration: 0.6}}
                className="ProjectMedia" 
                ref={props.reference ? props.reference : null} 
            >
                <a href="#" onClick={handleClick} >
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
                </a>
            </motion.div>
        </>
    );
}