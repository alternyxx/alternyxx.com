import { useState, useEffect } from "react"

export default function BasicAbout() {
    const [y, setY] = useState<string>('');

    useEffect(() => {
        var interval = 1800;
        // let intervalRef = setInterval(() => {
        //     setY(prev => {
        //         if (prev === "yy") {
        //             clearInterval(intervalRef)
        //         }
        //         interval = 1000;
        //         return prev + 'y';
        //     })
        // }, 2000);

        // return () => clearInterval(intervalRef);

        function addingYs() {
            let prevYs = ''; 
            interval -= 300;
            setY(prev => {
                prevYs = prev;
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