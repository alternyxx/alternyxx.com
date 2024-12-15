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
    uv.x = ((uv.x * 2 - 1) * (iResolution.x / iResolution.y) * 10) - 4;
    uv.y = ((uv.y * 2 - 1) * 8) + 1;

    // ~~~ The cool graph ~~~ //
    var d = ((uv.y - uv.x * uv.x + 5.0) * (uv.y - 4.8) * (uv.y + cos(1.0 / 
            (uv.x / 100.0))) + 100 + sin(iTime / 800) * 12.0 + max(0, iTime - 3000) * 10);
    var color = (d - 10.0) / 20.0;
    color = 1.0 - color;
    color = step(0.1, color);
    var fragColor = vec3f(color);

    return vec4f(fragColor, 1.0);
}