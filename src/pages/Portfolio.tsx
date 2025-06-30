import { useContext, useEffect } from "react";
import Project from "../components/Project/Project"

import { CanvasStateContext} from "../common/context";
import Screen from "../common/vertices/Screen";
import rings from "../common/shaders/rings.wgsl?raw"

export default function Portfolio() {
    const { setCanvasState } = useContext(CanvasStateContext);
    
    useEffect(() => {
        setCanvasState({
            vertices: Screen,
            dimensions: 2,
            shader: rings,
        });
    }, []);

    return (
        <div className="Page">
            <Project 
                projectName="Rhythm50"
                description="uhm"
                media={[
                    "https://static.alternyxx.com/mp4/ByYourSide.mp4", 
                    "https://static.alternyxx.com/mp4/NacreousSnowmelt.mp4",
                    "https://static.alternyxx.com/png/ByYourSidePaused.png",
                    "https://static.alternyxx.com/png/NacreousSnowmeltPaused.png"
                ]}
                thumbnails={[
                    "https://static.alternyxx.com/png/ByYourSide.png", 
                    "https://static.alternyxx.com/png/NacreousSnowmelt.png"
                ]}
            />
        </div>
    );
}