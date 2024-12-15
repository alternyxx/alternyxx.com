import { useEffect, useRef } from "react";
import BasicAboutShader from "./shaders/BasicAboutShader.wgsl?raw"

interface Canvas {
    stage: number
    device: GPUDevice
}

export default function Canvas(props: Canvas) {
    const canvas = useRef<HTMLCanvasElement>(document.createElement("canvas"));

    useEffect(() => {
        // ~~~~~~~~~~ Canvas And Context Set-Up ~~~~~~~~~~ //
        const context = canvas.current.getContext("webgpu");
        if (!context) {
            return
        }
        const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
            device: props.device,
                format: canvasFormat
        });

        const BasicAbout = new Float32Array([
           -1, -1,
           -1,  1,
            1,  1,

           -1, -1,
            1,  1,
            1, -1,
        ]);

        // ~~~~~~~~~~ Global variables for shaders ~~~~~~~~~~ //
        const iResolution = new Float32Array([window.innerWidth, window.innerHeight]);
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


        // ~~~~~~~~~~ Vertex Buffer ~~~~~~~~~~ //
        const vertexBuffer = props.device.createBuffer({
            label: "Basic About",
            size: BasicAbout.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });

        props.device.queue.writeBuffer(vertexBuffer, 0, BasicAbout);

        var shaderCode;
        if (props.stage === 0) {
            shaderCode = BasicAboutShader;
        }
        else {
            return;
        }

        const BasicAboutShaderModule = props.device.createShaderModule({
            label: "Basic About Shader",
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
            label: "Basic About Layout",
            entries: [{
                binding: 0,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: {}
            }, {
                binding: 1,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: {}
            }]
        });


        // ~~~~~~~~~~ Pipelines ~~~~~~~~~~ //
        const BasicAboutPipelineLayout = props.device.createPipelineLayout({
            label: "Basi cAbout Pipeline Layout",
            bindGroupLayouts: [iBindGroupLayout]
        });

        const BasicAboutPipeline = props.device.createRenderPipeline({
            label: "Basic About Pipeline",
            layout: BasicAboutPipelineLayout,
            vertex: {
                module: BasicAboutShaderModule,
                entryPoint: "vertexMain",
                buffers: [vertexBufferLayout]
            },
            fragment: {
                module: BasicAboutShaderModule,
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
            }]
        });

        
        // ~~~~~~~~~~ Frame loop ~~~~~~~~~~ //
        // let frameNum = 0;
        // let prevTime = 0;
        function frame(currentTime: number) {
            iTime[0] = currentTime;
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
            
            pass.setPipeline(BasicAboutPipeline);
            pass.setVertexBuffer(0, vertexBuffer);
            pass.setBindGroup(0, iBindGroups);
            pass.draw(BasicAbout.length / 2);

            pass.end();

            props.device.queue.submit([encoder.finish()]);
        
            requestAnimationFrame(frame);
        }
        
        requestAnimationFrame(frame)
    }, [props.stage])
    
    // Return canvas
    return (
        <canvas width={window.innerWidth}
            height={window.innerHeight} 
            ref={canvas}
            className="Canvas" >
        </canvas>
    )
}