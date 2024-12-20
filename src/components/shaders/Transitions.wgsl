@group(0) @binding(0) var<uniform> iResolution: vec2f;
@group(0) @binding(1) var<uniform> iTime: f32;

@vertex
fn vertexMain(@location(0) pos: vec2f) ->
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

// Function for rings

@fragment
fn fragmentMain(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
    var y = iResolution.y - fragCoord.y;
    var uv = vec2f(fragCoord.x / iResolution.x, y / iResolution.y);
    
    // Some zoom and normalisation //
    uv.x = (uv.x * 2 - 1) * (iResolution.x / iResolution.y);
    uv.y = uv.y * 2 - 1;

    // ~~~~~~~~~~~ The cool stuff ~~~~~~~~~~~ //

    // ~~~ Rings ~~~ //
    var uvr1 = vec2f(uv.x + 1, uv.y + 0.8);
    var d = length(uvr1);
    d = sin(d * 2 + iTime / 6) * 10;
    d = 0.15 / d;

    var fragColor = d * vec3f(sin(iTime / 2)) * diagonal(uv, vec3f(1.0), vec3f(0.2), 0.3);

    return vec4f(fragColor, 1.0);
}