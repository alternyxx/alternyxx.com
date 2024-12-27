import { useState, useEffect } from "react"
import { motion } from "motion/react"
import "./Entry.css"

export default function Entry() {
    const [y, setY] = useState<string>('');

    useEffect(() => {
        var interval = 1800;

        function addingYs() {
            interval -= 300;
            setY(prev => {
                return prev + 'y';
            })

            if (interval > 0) {
                setTimeout(addingYs, interval);
            }
        }
        const timer = setTimeout(addingYs, interval)

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <motion.div className="Entry">
            <motion.h1 
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: 7, ease: "linear" }}
                className="EntryText"
            >
                A 15 year old with way{y} too much time.
            </motion.h1>
        </motion.div>
    )
}