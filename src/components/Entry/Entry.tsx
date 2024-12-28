import { ReactElement, useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import "./Entry.css"

export default function Entry() {
    const [typewriterPos, setTypewriterPos] = useState<number>(1);

    const [text, setText] = useState<Array<string | ReactElement>>("A 15 year old with way too much time.".split(''));
    
    const typewriterTimer = useRef<number>(0);
    const yTimer = useRef<number>(0);

    // Adding Ys to the text
    useEffect(() => {
        const twInterval = 500;
        var yInterval = 1800;
        
        const typeWriter = () => {
            setText(prev => {
                var prevText = [...prev]; 
            })
        };


        const addingYs = () => {
            yInterval *= 0.75;
            setText(prev => {
                var prevText = [...prev];
                prevText[21] += 'y';
                return prevText;
            });

            if (yInterval > 70) {
                yTimer.current = setTimeout(addingYs, yInterval);
            }
        };
        yTimer.current = setTimeout(addingYs, yInterval);

        return () => {
            clearTimeout(yTimer.current);
        };
    }, []);

    return (
        <motion.div className="Entry">
            <motion.h1 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 7, ease: "linear" }}
            className="EntryText"
            >
                {text}
            </motion.h1>
        </motion.div>
    );
}