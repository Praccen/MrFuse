const screenQuadVertexSrc: string = 
`#version 300 es

layout (location = 0) in vec2 inPos;
layout (location = 1) in vec2 inTexCoords;

out vec2 texCoords;

void main()
{
    texCoords = inTexCoords;
    gl_Position = vec4(inPos, 0.0, 1.0); 
}  
`;

const screenQuadFragmentSrc: string =
`#version 300 es
precision highp float;

out vec4 FragColor;
in vec2 texCoords;

uniform sampler2D screenTexture;

void main() {
    vec4 col = texture(screenTexture, texCoords).rgba;
    FragColor = col;
}
`;

class ScreenQuadShaderProgram extends ShaderProgram {

    constructor(gl: WebGL2RenderingContext) {
        super(gl, screenQuadVertexSrc, screenQuadFragmentSrc);

	    this.setUniformLocation("screenTexture");
        
        this.gl.uniform1i(this.uniformBindings["screenTexture"], 0);
    }

    setupVertexAttributePointers() {
        // Change if input layout changes in shaders
        const stride = 4 * 4;
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, stride, 0);
        this.gl.enableVertexAttribArray(0);
     
        this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, stride, 2 * 4);
        this.gl.enableVertexAttribArray(1);
     }
};