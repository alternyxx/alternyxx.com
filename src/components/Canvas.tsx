import { useEffect, useRef } from "react";
import { MotionValue } from "motion/react"
import Entry from "./shaders/Entry.wgsl?raw"
import StageOne from "./shaders/StageOne.wgsl?raw"
import StageTwo from "./shaders/StageTwo.wgsl?raw"
import StageThree from "./shaders/StageThree.wgsl?raw"

const stages = [Entry, StageOne, StageTwo, StageThree];

interface Canvas {
    width: number
    height: number
    stage: number
    scroll: MotionValue<number>
    device: GPUDevice
}

export default function Canvas(props: Canvas) {
    const canvas = useRef<HTMLCanvasElement>(document.createElement("canvas"));

    const loopRef = useRef<number>(0);
    const prevStageTime = useRef<number>(0);

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
        const iResolution = new Float32Array([props.width, props.height]);
        const iResolutionBuffer = props.device.createBuffer({
            label: "iResolution",
            size: iResolution.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        props.device.queue.writeBuffer(iResolutionBuffer, 0, iResolution);

        const iTime = new Float32Array([0]);
        const iTimeBuffer = props.device.createBuffer({
            label: "iTIme",
            size: iTime.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        props.device.queue.writeBuffer(iTimeBuffer, 0, iTime);

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
            }]
        });

        // ~~~~~~~~~~ Frame loop ~~~~~~~~~~ //
        function frame(currentTime: number) {
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
        
        return () => window.cancelAnimationFrame(loopRef.current);
    }, [props.stage]);
    
    
    // Return canvas
    return (
        <canvas 
            width={ props.width }
            height={ props.height } 
            ref={canvas}
            className="Canvas" >
        </canvas>
    )
}