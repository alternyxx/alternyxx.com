import { useState, useEffect, useRef } from "react";
import { MotionValue } from "motion/react"

import Entry from "./shaders/Entry.wgsl?raw"
import StageOne from "./shaders/StageOne.wgsl?raw"
import StageTwo from "./shaders/StageTwo.wgsl?raw"
import StageThree from "./shaders/StageThree.wgsl?raw"

const stages = [Entry, StageOne, StageTwo, StageThree];

interface Canvas {
    stage: number
    darkMode: boolean
    scroll: MotionValue<number>
    device: GPUDevice
}

export default function Canvas(props: Canvas) {
    const canvas = useRef<HTMLCanvasElement>(document.createElement("canvas"));

    const [windowWidthHeight, setWindowWidthHeight] = useState([window.innerWidth, window.innerHeight]);

    const loopRef = useRef<number>(0);
    const prevStageTime = useRef<number>(0);
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

        const Screen = new Float32Array([
           -1, -1,
           -1,  1,
            1,  1,

           -1, -1,
            1,  1,
            1, -1,
        ]);

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
        const iLightDark = new Float32Array(props.darkMode ? [0.0] : [1.0]);
        const iLightDarkBuffer = props.device.createBuffer({
            label: "iLightDark",
            size: iLightDark.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        props.device.queue.writeBuffer(iLightDarkBuffer, 0, iLightDark);


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
            label: "Basic About",
            size: Screen.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });

        props.device.queue.writeBuffer(vertexBuffer, 0, Screen);

        var shaderCode = stages[props.stage];

        const ShaderModule = props.device.createShaderModule({
            label: "Shader Module",
            code: shaderCode
        });

        const vertexBufferLayout: GPUVertexBufferLayout = {
            arrayStride: 8,
            attributes: [{
                format: "float32x2",
                offset: 0,
                shaderLocation: 0,
            }],
        };


        // ~~~~~~~~~~ Bind Group Layout (also used in pipeline layout) ~~~~~~~~~~ //
        const iBindGroupLayout = props.device.createBindGroupLayout({
            label: "Group Layouts",
            entries: [{
                binding: 0,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: {}
            }, {
                binding: 1,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: {}
            }, {
                binding: 2,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: {}
            }, {
                binding: 3,
                visibility: GPUShaderStage.FRAGMENT,
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
            // ~~~ Adjusting input values ~~~ //
            iTime[0] = currentTime / 1000 - prevStageTime.current;
            
            props.device.queue.writeBuffer(iTimeBuffer, 0, iTime)
            
            const encoder = props.device.createCommandEncoder();

            const pass = encoder.beginRenderPass({
                colorAttachments: [{
                    view: context!.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: {r: 0, g: 0.7, b: 0.9, a: 1.0},
                    storeOp: "store",
                }]
            });
            
            pass.setPipeline(Pipeline);
            pass.setVertexBuffer(0, vertexBuffer);
            pass.setBindGroup(0, iBindGroups);
            pass.draw(Screen.length / 2);
            
            pass.end();
            
            props.device.queue.submit([encoder.finish()]);
            
            // I could prob ultra optimise this and put this is 
            // a seperate custom event but i aint getting paid at all
            if (iOpacity[0] < 1) {
                if (iOpacity[0] > 0.95) {
                    iOpacity[0] = 1;
                }
                else if (iOpacity[0] == 0) {
                    prevStageTime.current = currentTime / 1000;
                    console.log(prevStageTime.current);
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

            // Cancel animation from previous render
            window.cancelAnimationFrame(loopRef.current);
        };
    }, [props.stage, props.darkMode]);    
    
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