import { useState, useRef, useEffect, ReactElement, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";

import { CanvasStateContext } from "../common/context";
import Screen from "../common/vertices/Screen";
import entry from "../common/shaders/entry.wgsl?raw"

export default function Entry() {
    const { setCanvasState } = useContext(CanvasStateContext);
    const navigate = useNavigate();
    const { enter } = useParams();

    const [text, setText] = useState<Array<string | ReactElement>>(
        "A 16 year old with way too much time.".split('')
    );
    
    const typewriterTimer = useRef<number>(0);
    const yTimer = useRef<number>(0);

    // Adding Ys to the text
    useEffect(() => {
        setCanvasState({
            vertices: Screen,
            dimensions: 2,
            shader: entry,
        });

        const timeOut = setTimeout(() => {
            navigate(`/${enter}`)
        }, 14500);

        // ~~~ Enter button to skip entry ~~~ //
		const keyDown = (key: KeyboardEvent) => {
            if (key.key === "Enter") {
                key.preventDefault();
                navigate(`/${enter}`);
            }
        };

        document.addEventListener("keydown", keyDown);

        const typewriter = (
            <>
                <motion.span 
                    animate={{
                        opacity: [0, 0, 1, 1],
                        transition: {
                            duration: 1,
                            repeat: 4,
                            repeatDelay: 0,
                            ease: "linear",
                            times: [0, 0.5, 0.5, 1]
                        }
                    }}
                    className="Typewriter"
                >
                    &nbsp;
                </motion.span>
                &nbsp;        
            </>
        );

        const twInterval = 500;
        var yInterval = 1800;
        
        const typeWriter = () => {
            setText(prev => {
                var update = [...prev];
                update[22] = typewriter;
                return update;
            });
        };
        typewriterTimer.current = setTimeout(typeWriter, twInterval);


        // ~~~ Add Ys ~~~ //
        const addingYs = () => {
            if (yInterval == 1800) {
                clearTimeout(typewriterTimer.current);
            }
            yInterval *= 0.75;
            setText(prev => {
                var update = [...prev];
                update[21] += 'y';
                return update;
            });

            if (yInterval > 70) {
                yTimer.current = setTimeout(addingYs, yInterval);
            }
        };
        yTimer.current = setTimeout(addingYs, 5000);

        // ~~~ Clean up ~~~ //
        return () => {
            // ~~~ Clean up ~~~ //
			// Entry transition
			clearTimeout(timeOut);

            // Entry skip 
			document.removeEventListener("keydown", keyDown);

            // other animations
            clearTimeout(typewriterTimer.current)
            clearTimeout(yTimer.current);
        };
    }, []);

    return (
        <motion.div className="Entry">
            <motion.h1 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 11.2, ease: "linear" }}
            className="EntryText"
            >
                {text}
            </motion.h1>
        </motion.div>
    );
}