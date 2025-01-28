@group(0) @binding(0) var<uniform> iResolution: vec2f; 
@group(0) @binding(1) var<uniform> iTime: f32; 
@group(0) @binding(2) var<uniform> iOpacity: f32;
@group(0) @binding(3) var<uniform> iLightDark: f32;

@vertex 
fn vertexMain(@location(0) pos: vec2f, @location(1) normal: vec2f) -> 
    @builtin(position) vec4f { 
    return vec4f(pos.x, pos.y, 0, 1); 
} 
 
// Just use this as a utility function for when you need lines 
// Heavily nested version at https://www.shadertoy.com/view/DtSczc 
fn diagonal(pixelCords: vec2f, colorA: vec3f, colorB: vec3f, thickness: f32)  
    -> vec3f { 
    return mix(colorA, colorB,  
               smoothstep(0.249, 0.251, abs(fract(pixelCords.y - pixelCords.x) / thickness) - 0.5)); 
} 
 
fn palette(t: f32) -> vec3f { 
    let a = vec3f(0.5, 0.5, 0.5); 
    let b = vec3f(0.5, 0.5, 0.5); 
    let c = vec3f(2.0, 1.0, 0.0); 
    let d = vec3f(0.50, 0.20, 0.25); 
    return a + b * cos(6.28318 * (c * t + d)); 
} 
 
// Function for rings 
fn rings(pixelCords: vec2f) -> vec3f { 
    var r = length(pixelCords); 
    r = sin(r * 2 + iTime / 6) * 10; 
    r = (5.0 + iLightDark * 4) / r;
    let color = palette(r); 
    return vec3f(abs(sin(iTime / 2))) * color * r; 
} 
 
@fragment 
fn fragmentMain(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f { 
    var y = iResolution.y - fragCoord.y; 
    var uv = vec2f(fragCoord.x / iResolution.x, y / iResolution.y); 
     
    // Some zoom and normalisation // 
    uv.x = (uv.x * 2 - 1) * (iResolution.x / iResolution.y); 
    uv.y = uv.y * 2 - 1; 
 
    // ~~~~~~~~~~~ The cool stuff ~~~~~~~~~~~ // 
 
    // ~~~ Rings ~~~ // 
    let uvr1 = vec2f(uv.x - 1.2, uv.y - 1.2); 
    let uvr2 = vec2f(uv.x + 0.8, uv.y + 1.2); 
    var c = length(uvr2); 
    var d = length(uvr1); 
    c = sin(c * 2 + iTime / 6) * 10; 
    d = sin(d * 2 + iTime / 6) * 10; 
    c = 1.2 / c;
    d = 1.2 / d;
    let c1 = palette(abs(c)); 
    let d1 = palette(abs(d)); 
    let color1 = vec3f(abs(sin(iTime / 2))) * diagonal(uv, d1, c1, 1.2) * d; 
    let color2 = vec3f(abs(sin(iTime / 2))) * diagonal(uv, c1, d1, 1.2) * c; 
 
    // ~~~ More smaller rings :P ~~~ // 
    let color3 = rings(vec2f(uv.x - 0.4, uv.y + 0.2)); 
    let color4 = rings(vec2f(uv.x - 2, uv.y + 2)); 
    let color5 = rings(vec2f(uv.x + 3, uv.y + 2)); 
 
    var fragColor = color1 * color2 * color3 * color4; 
    
    fragColor = iLightDark - fragColor;

    return vec4f(fragColor * iOpacity, iOpacity); 
}