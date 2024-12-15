import { useState, useEffect } from "react"

export default function BasicAbout() {
    const [y, setY] = useState<string>('');

    useEffect(() => {
        function addY() {
            setY(prev => {
                if (prev === "yy") {
                    return prev + 'y';
                }
                else {
                    setTimeout(addY, 1000);
                    return prev + 'y'
                }
            });
        }

        setTimeout(addY, 1800);
    }, []);

    return (
        <h1 className="BasicAbout">
            A 15 year old with way{y} too much time.
        </h1>
    )
}