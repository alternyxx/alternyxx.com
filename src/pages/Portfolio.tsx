import { useContext, useEffect } from "react";
import Project from "../components/Project/Project"

import { StageContext } from "../common/context";

export default function Portfolio() {
    const { setStage } = useContext(StageContext);
    
    useEffect(() => {
        setStage(1);
    }, []);

    return (
        <div className="Page ml-[5%] mr-[5%]">
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