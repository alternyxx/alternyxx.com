import { useState, useEffect, useRef, useContext } from "react";

// import { DarkModeContext } from "../../common/context";
import { CanvasStateContext } from "../../common/context";

interface Callbacks {
    onResize?: () => [number, number],
    onRedraw?: () => void,
}

interface Canvas {
    device: GPUDevice,
    darkMode: boolean,
    res?: [number, number],
    callbacks?: Callbacks,
}

export default function Canvas({
    device, darkMode, res, callbacks
}: Canvas) {
    // useContext will rerender the whole thing which is not what i want for darkmode
    // const darkMode = useContext(DarkModeContext);
    // its fine here because the whole thing needs to rerender
    // there's still a plan to move this context up into App
    const { vertices, dimensions, shader } = useContext(CanvasStateContext);
    
    // - 1 is to disable scroll in entry
    const [resolution, setResolution] = useState<[number, number]>(
        res ? res : [window.innerWidth, window.innerHeight - 1]
    );
    const canvas = useRef<HTMLCanvasElement>(document.createElement("canvas"));

    const lightDarkTransition = useRef<number>(0);
    const loopRef = useRef<number>(0);
    const prevStageTime = useRef<number>(0);

    // Custom events
    const lightDark = new Event("lightDark");

    // fire event when lightbulb is pulled
    // no ref exists check since i cheekily make this render first before canvas c:
    useEffect(() => {
        document.dispatchEvent(lightDark);
    }, [darkMode]);
    
    // Canvas hook
    useEffect(() => {
        // ~~~~~~~~~~ Canvas And Context Set-Up ~~~~~~~~~~ //
        const context = canvas.current.getContext("webgpu");
        if (!context) {
            return;
        }

        const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
            device: device,
            format: canvasFormat,
            alphaMode: 'premultiplied',
        });
        
        // ~~~~~~~~~~ Vertex, Shader and Texture ~~~~~~~~~~ //
        const vertexBuffer = device.createBuffer({
            label: "Vertex Buffer",
            size: vertices.byteLength * 2,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });
    
        device.queue.writeBuffer(vertexBuffer, 0, vertices);
    
        var shaderCode = shader;
    
        const ShaderModule = device.createShaderModule({
            label: "Shader Module",
            code: shaderCode
        });
    
        const vertexBufferLayout: GPUVertexBufferLayout = {
            arrayStride: dimensions * 8, // bytes is 4, multiplied by 2 for normals
            attributes: [{
                // typescript doesnt like any other way
                // and i dont like typescript enough to figure it out
                format: `float32x${dimensions}`,
                offset: 0,
                shaderLocation: 0,
            }, {
                format: `float32x${dimensions}`,
                offset: dimensions * 4,
                shaderLocation: 1,
            }],
        };
        
        let depthTexture, depthTextureView: any;
        const createDepth = (res: [number, number]) => {
            depthTexture = device.createTexture({
                label: "change",
                size: res,
                format: "depth24plus",
                usage: GPUTextureUsage.RENDER_ATTACHMENT
            });
            depthTextureView = depthTexture.createView();
        };
        createDepth(resolution);
        
        // ~~~~~~~~~~ Bind Group Layout (also used in pipeline layout) ~~~~~~~~~~ //
        const iBindGroupLayout = device.createBindGroupLayout({
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
            }, {
                binding: 4,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                buffer: {}
            }]
        });

        
        // ~~~~~~~~~~ Pipelines ~~~~~~~~~~ //
        const pipelineLayout = device.createPipelineLayout({
            label: "Pipeline Layout",
            bindGroupLayouts: [iBindGroupLayout]
        });

        const Pipeline = device.createRenderPipeline({
            label: "Pipeline",
            layout: pipelineLayout,
            primitive: {
                cullMode: "front"
            },
            depthStencil: {
                format: "depth24plus",
                depthWriteEnabled: true,
                depthCompare: "less",
            },
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


        // ~~~~~~~~~~ Global variables for shaders ~~~~~~~~~~ //
        // ~~~ Resolution ~~~ //
        const iResolution = new Float32Array(resolution);
        const iResolutionBuffer = device.createBuffer({
            label: "iResolution",
            size: iResolution.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        device.queue.writeBuffer(iResolutionBuffer, 0, iResolution);

        // ~~~ Browser Resize Event ~~~ //
        const handleResize = () => {
            let newResolution: [number, number];
            if (!res) {
                newResolution = [window.innerWidth, window.innerHeight - 1];
            } else if (callbacks && callbacks.onResize) {
                newResolution = callbacks.onResize();
            } else {
                newResolution = resolution;
            }

            createDepth(newResolution);

            device.queue.writeBuffer(iResolutionBuffer, 0, new Float32Array(newResolution));
            
            setResolution(newResolution);
        };

        window.addEventListener("resize", handleResize);

        // ~~~ Light Mode / Dark Mode ~~~ //
        let ldVal = darkMode ? 0.0 : 1.0
        const iLightDark = new Float32Array([ldVal]);
        const iLightDarkBuffer = device.createBuffer({
            label: "iLightDark",
            size: iLightDark.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        device.queue.writeBuffer(iLightDarkBuffer, 0, iLightDark);

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
                device.queue.writeBuffer(iLightDarkBuffer, 0, new Float32Array([
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
        const iTimeBuffer = device.createBuffer({
            label: "iTIme",
            size: iTime.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        device.queue.writeBuffer(iTimeBuffer, 0, iTime);
    
        // ~~~ Opacity ~~~ //
        const iOpacity = new Float32Array([0]);
        const iOpacityBuffer = device.createBuffer({
            label: "iOpacity",
            size: iOpacity.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        device.queue.writeBuffer(iOpacityBuffer, 0, iOpacity);

        // ~~~ Mobile ~~~ //
        const iMobile = new Float32Array([0]);
        const iMobileBuffer = device.createBuffer({
            label: "iMobile",
            size: iMobile.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        device.queue.writeBuffer(iMobileBuffer, 0, iMobile);
        
        
        // ~~~~~~~~~~ Bind Groups ~~~~~~~~~~ //
        const iBindGroups = device.createBindGroup({
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
            }, {
                binding: 4,
                resource: { buffer: iMobileBuffer }
            }]
        });


        // ~~~~~~~~~~ Frame loop ~~~~~~~~~~ //
        const frame = (currentTime: number) => {
            // ~~~ Adjusting input time ~~~ //
            iTime[0] = currentTime / 1000 - prevStageTime.current;
            
            device.queue.writeBuffer(iTimeBuffer, 0, iTime)
            
            const encoder = device.createCommandEncoder();
            
            const pass = encoder.beginRenderPass({
                colorAttachments: [{
                    view: context!.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: {r: ldVal, g: ldVal, b: ldVal, a: 1.0},
                    storeOp: "store",
                }],
                depthStencilAttachment: {
                    view: depthTextureView,
                    depthLoadOp: "clear",
                    depthStoreOp: "store",
                    depthClearValue: 1.0,
                }
            });
            
            pass.setPipeline(Pipeline);
            pass.setVertexBuffer(0, vertexBuffer);
            pass.setBindGroup(0, iBindGroups);
            pass.draw(vertices.length / dimensions);
            
            pass.end();
            
            device.queue.submit([encoder.finish()]);
            
            // I could prob ultra optimise this and put this is 
            // a seperate custom event but i aint getting paid at all
            if (iOpacity[0] < 1.0) {
                if (iOpacity[0] == 0.0) {
                    prevStageTime.current = currentTime / 1000;
                    iOpacity[0] += 0.04;
                } else {
                    iOpacity[0] += 0.04;
                }
                device.queue.writeBuffer(iOpacityBuffer, 0, iOpacity);
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
    }, [vertices, shader, dimensions]);
    
    // Return canvas
    return (
        <canvas 
            width={ resolution[0] }
            height={ resolution[1] } 
            ref={canvas}
        />
    )
}