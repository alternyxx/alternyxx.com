@group(0) @binding(0) var<uniform> iResolution: vec2f;
@group(0) @binding(1) var<uniform> iTime: f32;
@group(0) @binding(2) var<uniform> iOpacity: f32;
@group(0) @binding(3) var<uniform> iLightDark: f32;

struct VertexInput {
    @location(0) pos: vec3f,
    @location(1) normal: vec3f,
}

struct VertexOutput {
    @builtin(position) pos: vec4f,
    @location(1) normal: vec3f,
}

const fNear = 0.1;
const fFar = 1000.0;
const fFov = 90.0;
const fFovRad = 1.0 / tan(radians(fFov * 0.5));

@vertex
fn vertexMain(vertexInput: VertexInput) -> VertexOutput {
    let fAspectRatio = iResolution.y / iResolution.x;

    // ~~~ Transformations ~~~ //
    let matProj = mat4x4f(
        vec4f(fAspectRatio * fFovRad, 0.0, 0.0, 0.0),
        vec4f(0.0, fFovRad, 0.0, 0.0),
        vec4f(0.0, 0.0, fFar / (fFar - fNear), (-fFar * fNear) / (fFar - fNear)),
        vec4f(0.0, 0.0, 1.0, 0.0)
    );
    
    let zAxisRotation = mat4x4f(
        vec4f(cos(iTime * 0.4), -sin(iTime * 0.4), 0.0, 0.0),
        vec4f(sin(iTime * 0.4), cos(iTime * 0.4), 0.0, 0.0),
        vec4f(0.0, 0.0, 1.0, 0.0),
        vec4f(0.0, 0.0, 0.0, 1.0)
    );
    
    let normalZAxisRotation = mat3x3f(
        vec3f(cos(iTime * 0.4), -sin(iTime * 0.4), 0.0),
        vec3f(sin(iTime * 0.4), cos(iTime * 0.4), 0.0),
        vec3f(0.0, 0.0, 1.0),
    );
    
    let xAxisRotation = mat4x4f(
        vec4f(1.0, 0.0, 0.0, 0.0),
        vec4f(0.0, cos(iTime * 0.2), -sin(iTime * 0.2), 0.0),
        vec4f(0.0, sin(iTime * 0.2), cos(iTime * 0.2), 0.0),
        vec4f(0.0, 0.0, 0.0, 1.0)
    );

    let normalXAxisRotation = mat3x3f(
        vec3f(1.0, 0.0, 0.0),
        vec3f(0.0, cos(iTime * 0.2), -sin(iTime * 0.2)),
        vec3f(0.0, sin(iTime * 0.2), cos(iTime * 0.2)),
    );
  
    // Rotate on the Z axis
    let triRotatedZ = vec4f(vertexInput.pos, 1.0)
                      * zAxisRotation;

    let normalRotatedZ = vertexInput.normal * normalZAxisRotation;
    
    // Rotate on the X axis
    let triRotatedZX = triRotatedZ * xAxisRotation;
    let normalRotatedZX = normalRotatedZ * normalXAxisRotation;
    
    var triTranslated = triRotatedZX;
    // triTranslated.x += 6.7;
    // triTranslated.y -= 1.6;
    triTranslated.z += 3.8;
    var triProjected = vec4f(triTranslated.x, triTranslated.y, triTranslated.z, 1.0) * matProj;

    var vertexOutput = VertexOutput();
    vertexOutput.pos = triProjected;
    vertexOutput.normal = normalRotatedZX;
    return vertexOutput;
}

// incredible simplification of camera
const camera = vec3f(0);

const light = vec3f(0.0, 0.0, -1.0);
const light_direction = vec3f(0.0, 0.0, 1.0);

@fragment
fn fragmentMain(fragmentInput: VertexOutput) -> @location(0) vec4f {
    let dp = dot(normalize(fragmentInput.normal), normalize(light)) + 0.9;
    // let dp = fragmentInput.normal.x * light_direction.x 
    //          + fragmentInput.normal.y * light_direction.y
    //          + fragmentInput.normal.z * light_direction.z;
    let ld = dp - iLightDark;
    var fragColor = vec3f(ld);
    if (dp > 0.9) {
        fragColor = vec3f(0.0);
    }
    return vec4f(fragColor * iOpacity, iOpacity);
}