import { useState, useEffect } from "react"
import "./BasicAbout.css"

export default function BasicAbout() {
    const [y, setY] = useState<string>('');

    useEffect(() => {
        var interval = 1800;

        function addingYs() {
            interval -= 300;
            setY(prev => {
                return prev + 'y';
            })

            if (interval > 299) {
                setTimeout(addingYs, interval);
            }
        }
        const timer = setTimeout(addingYs, interval)

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <h1 className="BasicAbout">
            A 15 year old with way{y} too much time.
        </h1>
    )
}