@group(0) @binding(0) var<uniform> iResolution: vec2f; 
@group(0) @binding(1) var<uniform> iTime: f32; 
@group(0) @binding(2) var<uniform> iOpacity: f32;
@group(0) @binding(3) var<uniform> iLightDark: f32;

const XUPPER = 8;
const XLOWER = -8;
const YUPPER = 4.5;
const YLOWER = -4.5;

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) normal: vec2f) 
-> @builtin(position) vec4f {
    return vec4f(pos.x, pos.y, 0, 1); 
}

@fragment
fn fragmentMain(fragmentInput: VertexOutput) -> @location(0) vec4f {
    var y = iResolution.y - fragCoord.y;
    var uv = vec2f(fragCoord.x / iResolution.x, y / iResolution.y);
    
    // Some zoom and normalisation //
    uv.x = (uv.x * 2.0 - 1) * (iResolution.x / iResolution.y);
    uv.y = uv.y * 2.0 - 1;

    var fragColor = vec3f(length(uv.xy / 10.0));
    
    // f(x) = sin(x)
    if (uv.y < sin(uv.x) * 1.05 && uv.y > sin(uv.x) * 0.95) {
        fragColor = vec3f(0);
    } else if (uv.y > sin(uv.x) * 1.05 && uv.x < sin(uv.x) * 0.95) {
        fragColor = vec3(0.0);
    }

    return vec4f(fragColor * iOpacity, iOpacity);
}