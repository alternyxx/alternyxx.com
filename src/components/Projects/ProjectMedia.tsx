import { useState, MouseEvent, RefObject } from "react";
import { motion } from "motion/react";

interface ProjectMedia {
    media: string
    key: number
    type: string
    reference?: RefObject<HTMLDivElement> | null
    last?: any
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
                className="ProjectMedia" 
                ref={props.reference} 
            >
                <a href="#" onClick={handleClick} className={props.type}>
                    <motion.img 
                        src={props.media}
                        className={props.type}
                    />  
                </a>
            </motion.div>
        </>
    );
}