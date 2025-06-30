import { useState, useEffect, useContext, Dispatch, SetStateAction, KeyboardEvent } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { rust } from "@codemirror/lang-rust"
import { gruvboxDark, gruvboxLight } from "@uiw/codemirror-theme-gruvbox-dark";

import { DarkModeContext, CanvasStateContext } from "../../common/context";
import Canvas from "../../components/Canvas/Canvas";
import Screen from "../../common/vertices/Screen";

const Binds = /*wgsl*/`
@group(0) @binding(0) var<uniform> iResolution: vec2f; 
@group(0) @binding(1) var<uniform> iTime: f32; 
@group(0) @binding(2) var<uniform> iOpacity: f32;
@group(0) @binding(3) var<uniform> iLightDark: f32;
`

const DefaultVertexShader = /*wgsl*/`
@vertex
fn vertexMain(@location(0) pos: vec2f) ->
    @builtin(position) vec4f {
    return vec4f(pos.x, pos.y, 0, 1);
}
`

const DefaultFragmentShader = /*wgsl*/ `@fragment
fn fragmentMain(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
    var y = iResolution.y - fragCoord.y;
    var uv = vec2f(fragCoord.x / iResolution.x, y / iResolution.y);
    
    // Some zoom and normalisation //
    uv.x = ((uv.x * 2 - 1) * (iResolution.x / iResolution.y) * 10) - 4;
    uv.y = ((uv.y * 2 - 1) * 8) + 1;

    // ~~~ The cool graph ~~~ //
    // This is from https://youtu.be/QhvzmskRiCk?si=oYKoBYtil_Wof8jH&t=115
    // It is worth nothing to never touch this as I do not understand it either especially max()
    var d = ((uv.y - uv.x * uv.x + 5.0) * (uv.y - 4.8) * (uv.y + cos(1.0 / 
            (uv.x / 100.0))) + 100 + sin(iTime * 0.8) * 14.0 + max(0, iTime - 9.2) * 10000);
    var color = (d - 10.0) / 20.0; 
    color = 1.0 - color;
    color = smoothstep(0.0, 0.15, color);
    var fragColor = vec3f(color + 0.5);

    fragColor = fragColor;
    return vec4f(fragColor, 1.0);
}
`

interface FilesState {
    vertexShader: string,
    fragmentShader: string,
    vertices: string,
}

interface Playground {
    device: GPUDevice | undefined,
    setBgShow: Dispatch<SetStateAction<boolean>>,
}

export default function Playground({ device, setBgShow }: Playground) {
    const darkMode = useContext(DarkModeContext);
    const { setCanvasState } = useContext(CanvasStateContext);

    const [windowRes, setWindowRes] = useState([window.innerWidth, window.innerHeight]);
    const [tabs, setTabs] = useState(["fragment.wgsl", "vertex.wgsl", "vertices.ts"]);
    const [currentTab, setCurrentTab] = useState();
    const [code, setCode] = useState<FilesState>({
        vertexShader: DefaultVertexShader,
        fragmentShader: DefaultFragmentShader,
        vertices: "2",
    });

    const rerender = () => {
        setCanvasState({
            vertices: Screen,
            shader: Binds + code.vertexShader + code.fragmentShader,
            dimensions: 2,
        });
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && (e.key == "s" || e.key == "S")) {
            e.preventDefault();
            console.log(code.fragmentShader)
            rerender();
        }
    };

    useEffect(() => {
        setBgShow(false);

        setCanvasState({
            vertices: Screen,
            shader: Binds + code.vertexShader + code.fragmentShader,
            dimensions: 2,
        });;

    }, []);
    
    const handleResize = (): [number, number] => {
        return [window.innerWidth * 0.4, window.innerHeight * 0.4];
    }

    return (
        <div className="Page h-[100vh]" onKeyDown={ onKeyDown }>
            <div className="flex justify-between ml-[5vw] mr-[5vw] h-[650px] lg:ml-[10vw] lg:mr-[10vw]">
                <div className="relative self-center bottom-[100px]">
                    { device &&
                        <Canvas
                            device={ device }
                            darkMode={true}
                            res={[window.innerWidth * 0.4, window.innerHeight * 0.4]}
                            callbacks={{onResize: handleResize}}
                        />
                    }
                </div>
                <div className="">
                    <div className="flex">
                        {
                            tabs.map((v, i) => {
                                return (
                                    <div
                                        key={ i }
                                        className="bg-orange-500 mr-1 px-1 text-sm"
                                    >
                                        { v }
                                    </div>
                                );
                            })
                        }
                    </div>
                    <ReactCodeMirror
                        value={code.fragmentShader}
                        height="650px"
                        width="38vw"
                        theme={ darkMode ? gruvboxDark : gruvboxLight }
                        extensions={[rust()]}
                        onChange={val => {
                            setCode(prev => {
                                return {
                                    ...prev,
                                    fragmentShader: val,
                                };
                            });
                        }}
                    />
                    <button onClick={ rerender }>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}