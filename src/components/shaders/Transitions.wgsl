@group(0) @binding(0) var<uniform> iResolution: vec2f;
@group(0) @binding(1) var<uniform> iTime: f32;

@vertex
fn vertexMain(@location(0) pos: vec2f) ->
    @builtin(position) vec4f {
    return vec4f(pos.x, pos.y, 0, 1);
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
    var d = length(uv);

    d = sin(d * 2 + iTime / 6) * 10;

    d = 0.1 / d;

    // d = 1 - d;

    // ~~~ Diagonal black lines ~~~ //
    var x = fract((uv.y - uv.x) * 0.5);
    x = abs(x - 0.5);
    var w = smoothstep(0.249, 0.251, x);

    var color = vec3f(sin(iTime / 2));
    var fragColor = color * d;

    return vec4f(fragColor, 1.0);
}