const vertexShaderSrc: string = 
`#version 300 es
// If inputs change, also update SimpleShaderProgram::setupVertexAttributePointers to match
layout (location = 0) in vec3 inPosition;
layout (location = 1) in vec4 inColor;
layout (location = 2) in vec2 inTexCoords;

// If uniforms change, also update SimpleShaderProgram to match
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 textureMatrix;

out vec4 color;
out vec2 texCoords;

void main() {
    gl_Position = viewMatrix * modelMatrix * vec4(inPosition, 1.0);
    color = inColor;
    texCoords = vec2(textureMatrix * vec4(inTexCoords, 0.0, 1.0));
}`;
    
const fragmentShaderSrc: string = 
`#version 300 es
precision highp float;

in vec4 color;
in vec2 texCoords;

// If uniforms change, also update SimpleShaderProgram to match
layout(location = 3) uniform sampler2D texture0;
layout(location = 4) uniform int useTexture;

out vec4 FragColor;

mat4 thresholdMatrix = mat4(
    1.0, 9.0, 3.0, 11.0,
    13.0, 5.0, 15.0, 7.0,
    4.0, 12.0, 2.0, 10.0,
    16.0, 8.0, 14.0, 6.0
    );

void main()
{
    if (useTexture == 1) {
        FragColor = texture(texture0, texCoords);
    }
    else {
        FragColor = color;
    }

    float threshold = thresholdMatrix[int(floor(mod(gl_FragCoord.x, 4)))][int(floor(mod(gl_FragCoord.y, 4)))] / 17;
    if (threshold >= FragColor.a) {
        discard;
    }
}`;

class SimpleShaderProgram extends ShaderProgram {
    constructor(gl: WebGL2RenderingContext) {
        super(gl, vertexShaderSrc, fragmentShaderSrc);

        this.uniformBindings = new Map<string, number>([
            ["modelMatrix", 0,],
            ["viewMatrix", 1],
            ["textureMatrix", 2],
            ["texture0", 3],
            ["useTexture", 4],
        ]);

        this.use();

        this.gl.uniform1i(this.uniformBindings["texture0"], 0);
    }

    setupVertexAttributePointers(): void {
        // Change if input layout changes in shaders
        this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 9 * 4, 0);
        this.gl.enableVertexAttribArray(0);

        this.gl.vertexAttribPointer(1, 4, this.gl.FLOAT, false, 9 * 4, 3 * 4);
        this.gl.enableVertexAttribArray(1);

        this.gl.vertexAttribPointer(2, 2, this.gl.FLOAT, false, 9 * 4, 7 * 4);
        this.gl.enableVertexAttribArray(2);
    }
};
