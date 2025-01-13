import { ReactElement, useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import "./Entry.css"

interface Entry {
    stage: number
    setStage: Function
}

export default function Entry(props: any) {
    // const [typewriterPos, setTypewriterPos] = useState<number>(1);

    const [text, setText] = useState<Array<string | ReactElement>>("A 15 year old with way too much time.".split(''));
    
    const typewriterTimer = useRef<number>(0);
    const yTimer = useRef<number>(0);

    // Adding Ys to the text
    useEffect(() => {
        const timeOut = setTimeout(() => props.setStage(1), 13200);

        // ~~~ Enter button to skip entry ~~~ //
		const keyDown = (key: KeyboardEvent) => {
            // it doesnt hurt to check stage is 0
            if (props.stage === 0 && key.key === "Enter") {
                key.preventDefault();
                props.setStage(1);
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