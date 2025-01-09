@group(0) @binding(0) var<uniform> iResolution: vec2f;
@group(0) @binding(1) var<uniform> iTime: f32;
@group(0) @binding(2) var<uniform> iOpacity: f32;
@group(0) @binding(3) var<uniform> iLightDark: f32;

const fNear = 0.1;
const fFar = 1000.0;
const fFov = 90.0;
const fFovRad = 1.0 / tan(radians(fFov * 0.5));

@vertex
fn vertexMain(@location(0) pos: vec3f) ->
    @builtin(position) vec4f {
    let fAspectRatio = iResolution.y / iResolution.x;

    // Projection Matrix
    let matProj = mat4x4f(vec4f(fAspectRatio * fFovRad, 0.0, 0.0, 0.0),
                            vec4f(0.0, fFovRad, 0.0, 0.0),
                            vec4f(0.0, 0.0, fFar / (fFar - fNear), (-fFar * fNear) / (fFar - fNear)),
                            vec4f(0.0, 0.0, 1.0, 0.0));
    // Rotate on the Z axis
    let triRotatedZ = vec4f(pos.x, pos.y, pos.z, 1.0) * 
                    mat4x4f(vec4f(cos(iTime * 0.4), -sin(iTime * 0.4), 0.0, 0.0),
                            vec4f(sin(iTime * 0.4), cos(iTime * 0.4), 0.0, 0.0),
                            vec4f(0.0, 0.0, 1.0, 0.0),
                            vec4f(0.0, 0.0, 0.0, 1.0));
    
    // Rotate on the X axis
    let triRotatedZX = triRotatedZ * 
                        mat4x4f(vec4f(1.0, 0.0, 0.0, 0.0),
                                vec4f(0.0, cos(iTime * 0.2), -sin(iTime * 0.2), 0.0),
                                vec4f(0.0, sin(iTime * 0.2), cos(iTime * 0.2), 0.0),
                                vec4f(0.0, 0.0, 0.0, 1.0));
    
    var triTranslated = triRotatedZX;
    triTranslated.x += 1.0;
    triTranslated.z += 1.0;
    var triProjected = vec4f(triTranslated.x, triTranslated.y, triTranslated.z, 1.0) * matProj;

    return triProjected;
}

@fragment
fn fragmentMain(@builtin(position) pos: vec4f) -> @location(0) vec4f {
    let ld = 1 - iLightDark;
    var fragColor = vec3f(ld);
    return vec4f(fragColor * iOpacity, iOpacity);
}