@group(0) @binding(0) var<uniform> iResolution: vec2f;
@group(0) @binding(1) var<uniform> iTime: f32;

@vertex
fn vertexMain(@location(0) pos: vec2f) ->
    @builtin(position) vec4f {
    return vec4f(pos.x, pos.y, 0, 1);
}

// https://stackoverflow.com/questions/15276454/is-it-possible-to-draw-line-thickness-in-a-fragment-shader
// sry im not smart enough to do basic things ;-;
fn distanceToLine(p1: vec2f, p2: vec2f, point: vec2f) -> f32 {
    let a = p1.y-p2.y;
    let b = p2.x-p1.x;
    return abs(a * point.x + b * point.y + p1.x * p2.y - p2.x * p1.y) / sqrt( a * a + b * b);
}

@fragment
fn fragmentMain(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
    var y = iResolution.y - fragCoord.y;
    var uv = vec2f(fragCoord.x / iResolution.x, y / iResolution.y);
    
    // Some zoom and normalisation //
    uv.x = (uv.x * 2 - 1) * (iResolution.x / iResolution.y);
    uv.y = uv.y * 2 - 1;

    // ~~~ The cool stuff ~~~ //
    var uv1 = vec2f(uv.x - sin(iTime) * 2.4, uv.y); 
    var one = length(uv1);
    one = 0.003 / one;

    if (cos(iTime) < 0) {
        one = 0;
    }

    var line = 0.0;
    if (uv.y < 0.002 && uv.y > -0.002 && uv1.x > -0.45 && uv1.x < 0) {
        line = 1.0;
    }

    var color = mix(vec3f(0.0), vec3f(1.0, 1.0, 1.0), one);
    // color += line;

    let fragColor = color;
    return vec4f(fragColor, 1);
}