@group(0) @binding(0) var<uniform> iResolution: vec2f;
@group(0) @binding(1) var<uniform> iTime: f32;

@vertex
fn vertexMain(@location(0) pos: vec2f) ->
    @builtin(position) vec4f {
    return vec4f(pos.x, pos.y, 0, 1);
}

fn palette(t: f32) -> vec3f {
    var a = vec3f(-0.302, 0.498, 0.650);
    var b = vec3f(0.048, 0.498, 0.350);
    var c = vec3f(1.608, 3.138, 0.620);
    var d = vec3f(3.438, 3.012, 4.025);

    return a + b * cos(6.28318 * (c * t + d));
}

@fragment
fn fragmentMain(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
    var y = iResolution.y - fragCoord.y;
    var uv = vec2f(fragCoord.x / iResolution.x, y / iResolution.y);
    
    uv.x = ((uv.x * 2 - 1) * (iResolution.x / iResolution.y) * 10) - 4;
    uv.y = ((uv.y * 2 - 1) * 8) + 1;

    var d = ((uv.y - uv.x * uv.x + 5.0) * (uv.y - 4.8) * (uv.y + cos(1.0 / (uv.x / 100.0))) + 100 + sin(iTime / 800) * 10.0);
    
    var color = (d - 10.0) / 20.0;
    color = 1.0 - color;
    color = step(0.1, color);

    return vec4f(color, color, color, 1.0);
}