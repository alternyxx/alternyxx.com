import { useContext, useEffect } from "react";
import { useNavigate } from "react-router"

import { IndivTechnology } from "../../components/Technologies/Technologies";

import { CanvasStateContext} from "../../common/context";
import Screen from "../../common/vertices/Screen";
import rings from "../../common/shaders/rings.wgsl?raw"

export default function Tools() {
    const { setCanvasState } = useContext(CanvasStateContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        setCanvasState({
            vertices: Screen,
            dimensions: 2,
            shader: rings,
        });
    }, []);

    return (
        <div className="Page">
            <div className="flex justify-center h-[80%]">
                <div onClick={e => {
                    e.preventDefault();
                    navigate("/tools/playground/")
                }}>
                    <IndivTechnology
                        text="WGSL Playground"
                        description="Play around with shaders in wgsl"
                    />
                </div>
                <IndivTechnology
                    text="complexnyx"
                    description="Conformal map of the complex plane of a given complex function"
                />
            </div>
        </div>
    );
}