@group(0) @binding(0) var<uniform> iResolution: vec2f;
@group(0) @binding(1) var<uniform> iTime: f32;
@group(0) @binding(2) var<uniform> iOpacity: f32;
@group(0) @binding(3) var<uniform> iLightDark: f32;

@vertex
fn vertexMain(@location(0) pos: vec2f) ->
    @builtin(position) vec4f {
    return vec4f(pos.x, pos.y, 0, 1);
}

fn palette(t: f32) -> vec3f { 
    let a = vec3f(0.731, 1.098, 0.192); 
    let b = vec3f(0.358, 1.090, 0.657); 
    let c = vec3f(1.077, 0.360, 0.328); 
    let d = vec3f(0.965, 2.265, 0.837); 
    return a + b * cos(6.28318 * (c * t + d)); 
} 

fn rand(p: f32) -> f32 {
    var a = fract(p * vec2f(248.6199, 146.69));
    a += dot(a, a+ 37.191);
    return fract(a.x*a.y);
}

fn rand2(p: f32) -> f32 {
    var a = fract(p * vec2f(87.189, 56.09));
    a += dot(a, a + 25.19);
    return fract(a.x*a.y);
}

fn shape(pixelCords: vec2f) -> vec3f {
    var c = length(pixelCords);
    c = smoothstep(0.0, 0.4, 0.001 / c);
    // c = 0.0015 / c;

    var l = vec3f(0.0, 0.0, 0.0);
    if (pixelCords.y < 0.002 && pixelCords.y > -0.002 && pixelCords.x > -0.45 && pixelCords.x < 0) {
        l = palette(abs(fract(pixelCords.x * pixelCords.y * 1009.0)));
    }

    let diag = vec2f(pixelCords.x + 0.45, pixelCords.y);
    if (diag.x <= 0 && diag.x >= -0.2) {
        var dy = diag.x * 0.8;
        if (diag.y >= dy - 0.002 && diag.y <= dy + 0.002) {
            l = palette(abs(fract(pixelCords.x * pixelCords.y * 20))) + diag.x * 8;
        }
    }

    var s = mix(vec3f(0.0, 0.0, 0.002), vec3f(1.0), c);
    s += l;
    return s;
}

fn shape2(pixelCords: vec2f) -> vec3f {
    var c = length(pixelCords);
    c = smoothstep(0.0, 0.8, 0.003 / c);
    // c = 0.0015 / c;

    var l = vec3f(0.0, 0.0, 0.0);
    if (pixelCords.y < 0.081 && pixelCords.y > 0.077 && pixelCords.x > -0.45 && pixelCords.x < -0.1) {
        l = palette(abs(fract(pixelCords.x * pixelCords.y * 24)));
    }

    let diag = vec2f(pixelCords.x, pixelCords.y);
    if (diag.x <= 0 && diag.x >= -0.1) {
        var dy = -diag.x * 0.8;
        if (diag.y >= dy - 0.002 && diag.y <= dy + 0.002) {
            l = palette(abs(fract(pixelCords.x * pixelCords.y * 20)));
        }
    }

    var s = mix(vec3f(0.0), vec3f(1.0), c);
    s += l;
    return s;
}


@fragment
fn fragmentMain(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
    var y = iResolution.y - fragCoord.y;
    var uv = vec2f(fragCoord.x / iResolution.x, y / iResolution.y);
    
    // Some zoom and normalisation //
    uv.x = (uv.x * 2 - 1) * (iResolution.x / iResolution.y);
    uv.y = uv.y * 2 - 1;

    // ~~~ The cool stuff ~~~ //
    var color = vec3f(0.0);
    for (var i = 0.0; i < 1; i += 0.10) {
        let randInt = rand(i);
        let mov = iTime * randInt * 0.1;
        let randY = randInt * 1.8 - 0.9;
        let randX = fract(randInt * 31.8) * 4.0 - 2.0;

        let wrappedX = (uv.x + randX - mov) % 4.0;

        color += shape(vec2f(wrappedX, uv.y + randY));
    }

    for (var i = 0.0; i < 1; i += 0.10) {
        let randInt = rand2(i);
        let mov = iTime * randInt * 0.1;
        let randY = randInt * 1.8 - 0.9;
        let randX = fract(randInt * 31.8) * 4.0 - 2.0;

        let wrappedX = (uv.x + randX - mov) % 4.0;

        color += shape2(vec2f(wrappedX, uv.y + randY));
    }

    var fragColor = color;
    fragColor = fragColor * (1 - iLightDark) + (1 - fragColor) * iLightDark;
    return vec4f(fragColor * iOpacity, iOpacity);
}