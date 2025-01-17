import { useState, useEffect, useRef } from "react";

// import { DarkModeContext } from "../../common/context";

// vertices
import { Screen } from "./vertices/Screen";
import { Blahaj } from "./vertices/Blahaj"
// import { Cube } from "./vertices/Cube";

const vertices = [Screen, Screen, Blahaj, Screen];
const verticesInfo = [2, 2, 3, 2];

// shaders
import Entry from "./shaders/Entry.wgsl?raw"
import StageOne from "./shaders/StageOne.wgsl?raw"
import StageTwo from "./shaders/StageTwo.wgsl?raw"
import StageThree from "./shaders/StageThree.wgsl?raw"

const stages = [Entry, StageOne, StageTwo, StageThree];

interface Canvas {
    stage: number
    darkMode: boolean
    device: GPUDevice
}

export default function Canvas(props: Canvas) {
    // useContext will rerender the whole thing which is not what i want
    // const darkMode = useContext(DarkModeContext);
    const canvas = useRef<HTMLCanvasElement>(document.createElement("canvas"));

    const [windowWidthHeight, setWindowWidthHeight] = useState([window.innerWidth, window.innerHeight]);

    const lightDarkTransition = useRef<number>(0);
    const loopRef = useRef<number>(0);
    const prevStageTime = useRef<number>(0);

    // Custom events
    const lightDark = new Event("lightDark");

    // fire event when lightbulb is pulled
    // no ref exists check since i cheekily make this render first before canvas c:
    useEffect(() => {
        document.dispatchEvent(lightDark);
    }, [props.darkMode]);

    // Canvas hook
    useEffect(() => {
        // ~~~~~~~~~~ Canvas And Context Set-Up ~~~~~~~~~~ //
        const context = canvas.current.getContext("webgpu");
        if (!context) {
            return;
        }
        const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
            device: props.device,
            format: canvasFormat,
            // this doesnt seem to work
            alphaMode: 'premultiplied',
        });

        // ~~~~~~~~~~ Global variables for shaders ~~~~~~~~~~ //
        // ~~~ Resolution ~~~ //
        const iResolution = new Float32Array([windowWidthHeight[0], windowWidthHeight[1]]);
        const iResolutionBuffer = props.device.createBuffer({
            label: "iResolution",
            size: iResolution.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        props.device.queue.writeBuffer(iResolutionBuffer, 0, iResolution);

        // ~~~ Browser Resize Event ~~~ //
		const handleResize = () => {
            props.device.queue.writeBuffer(iResolutionBuffer, 0, new Float32Array([
                window.innerWidth, window.innerHeight
            ]));
			setWindowWidthHeight([window.innerWidth, window.innerHeight]);
		};

		window.addEventListener("resize", handleResize);

        // ~~~ Light Mode / Dark Mode ~~~ //
        var ldVal = props.darkMode ? 0.0 : 1.0
        const iLightDark = new Float32Array([ldVal]);
        const iLightDarkBuffer = props.device.createBuffer({
            label: "iLightDark",
            size: iLightDark.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        props.device.queue.writeBuffer(iLightDarkBuffer, 0, iLightDark);

        // ~~~ Light Mode / Dark Mode Switch ~~~ //
        const handleLightDark = () => {
            var ld: number;
            if (ldVal >= 1.0) {
                ld = -0.1
            } else {
                ld = 0.1;
            }
            const write = () => {
                ldVal += ld;
                props.device.queue.writeBuffer(iLightDarkBuffer, 0, new Float32Array([
                    ldVal
                ]));

                if (ldVal < 1 && ldVal > 0) {
                    lightDarkTransition.current = setTimeout(write, 80);
                }
            };

            lightDarkTransition.current = setTimeout(write, 80); 
        };

        document.addEventListener("lightDark", handleLightDark);


        // ~~~ Time passed ~~~ //
        const iTime = new Float32Array([0]);
        const iTimeBuffer = props.device.createBuffer({
            label: "iTIme",
            size: iTime.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        props.device.queue.writeBuffer(iTimeBuffer, 0, iTime);
    
        // ~~~ Opacity ~~~ //
        const iOpacity = new Float32Array([0]);
        const iOpacityBuffer = props.device.createBuffer({
            label: "iOpacity",
            size: iOpacity.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        props.device.queue.writeBuffer(iOpacityBuffer, 0, iOpacity);


        // ~~~~~~~~~~ Vertex Buffer ~~~~~~~~~~ //
        const vertexBuffer = props.device.createBuffer({
            label: "Vertex Buffer",
            size: vertices[props.stage].byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });

        props.device.queue.writeBuffer(vertexBuffer, 0, vertices[props.stage]);

        var shaderCode = stages[props.stage];

        const ShaderModule = props.device.createShaderModule({
            label: "Shader Module",
            code: shaderCode
        });

        const vertexBufferLayout: GPUVertexBufferLayout = {
            arrayStride: verticesInfo[props.stage] * 4,
            attributes: [{
                format: `float32x${props.stage != 2 ? 2 : 3}`,
                offset: 0,
                shaderLocation: 0,
            }],
        };


        // ~~~~~~~~~~ Bind Group Layout (also used in pipeline layout) ~~~~~~~~~~ //
        const iBindGroupLayout = props.device.createBindGroupLayout({
            label: "Group Layouts",
            entries: [{
                binding: 0,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                buffer: {}
            }, {
                binding: 1,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                buffer: {}
            }, {
                binding: 2,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                buffer: {}
            }, {
                binding: 3,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                buffer: {}
            }]
        });


        // ~~~~~~~~~~ Pipelines ~~~~~~~~~~ //
        const pipelineLayout = props.device.createPipelineLayout({
            label: "Pipeline Layout",
            bindGroupLayouts: [iBindGroupLayout]
        });

        const Pipeline = props.device.createRenderPipeline({
            label: "Pipeline",
            layout: pipelineLayout,
            vertex: {
                module: ShaderModule,
                entryPoint: "vertexMain",
                buffers: [vertexBufferLayout]
            },
            fragment: {
                module: ShaderModule,
                entryPoint: "fragmentMain",
                targets: [{
                    format: canvasFormat
                }]
            }
        });


        // ~~~~~~~~~~ Bind Groups ~~~~~~~~~~ //
        const iBindGroups = props.device.createBindGroup({
            label: "input Bind Groups",
            layout: iBindGroupLayout,
            entries: [{
                binding: 0,
                resource: { buffer: iResolutionBuffer }
            }, {
                binding: 1,
                resource: { buffer: iTimeBuffer }
            }, {
                binding: 2,
                resource: { buffer: iOpacityBuffer }
            }, {
                binding: 3,
                resource: { buffer: iLightDarkBuffer }
            }]
        });

        // ~~~~~~~~~~ Frame loop ~~~~~~~~~~ //
        const frame = (currentTime: number) => {
            // ~~~ Adjusting input time ~~~ //
            iTime[0] = currentTime / 1000 - prevStageTime.current;
            
            props.device.queue.writeBuffer(iTimeBuffer, 0, iTime)
            
            const encoder = props.device.createCommandEncoder();

            const pass = encoder.beginRenderPass({
                colorAttachments: [{
                    view: context!.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: {r: ldVal, g: ldVal, b: ldVal, a: 1.0},
                    storeOp: "store",
                }]
            });
            
            pass.setPipeline(Pipeline);
            pass.setVertexBuffer(0, vertexBuffer);
            pass.setBindGroup(0, iBindGroups);
            pass.draw(vertices[props.stage].length / verticesInfo[props.stage]);
            
            pass.end();
            
            props.device.queue.submit([encoder.finish()]);
            
            // I could prob ultra optimise this and put this is 
            // a seperate custom event but i aint getting paid at all
            if (iOpacity[0] < 1.0) {
                if (iOpacity[0] > 0.95) {
                    iOpacity[0] = 1.0;
                }
                else if (iOpacity[0] == 0.0) {
                    prevStageTime.current = currentTime / 1000;
                    iOpacity[0] += 0.0125;
                }
                else {
                    iOpacity[0] += 0.0125;
                }
                props.device.queue.writeBuffer(iOpacityBuffer, 0, iOpacity);
            }
            
            loopRef.current = requestAnimationFrame(frame);
        }

        loopRef.current = requestAnimationFrame(frame);
        
        return () => {
            // Unmount event listeners
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("lightDark", handleLightDark);

            // Cancel some things
            clearTimeout(lightDarkTransition.current);

            // Cancel animation from previous render
            window.cancelAnimationFrame(loopRef.current);
        };
    }, [props.stage]);
    
    // Return canvas
    return (
        <canvas 
            width={ windowWidthHeight[0] }
            // - 1 is to disable scroll in entry
            height={ windowWidthHeight[1] - 1 } 
            ref={canvas}
            className="Canvas" >
        </canvas>
    )
}