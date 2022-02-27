import { ExecuteGLProgramBase } from "./execute-gl-program-base";
import { rotate3x3 } from "./utils/matrix";

export class FTransforms extends ExecuteGLProgramBase {
  render() {
    let angleDegree = 0;

    const timerHandle = setInterval(() => {
      this.renderScene((angleDegree * Math.PI) / 180);
      angleDegree++;

      if (angleDegree === 360) {
        clearInterval(timerHandle);
      }
    }, 10);
  }

  renderScene(rotateAngleRad: number) {
    if (!this.gl) {
      console.log("ImageTexture::renderImage: null gl context");
      return;
    }

    if (!this.glProgram) {
      console.log("ImageTexture::renderImage: null glProgram");
      return;
    }

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // coordinates for letter F
    const positions = [
      0.0, -0.1, 0.0, 0.8, 0.2, -0.1,

      0.2, -0.1, 0.0, 0.8, 0.2, 0.8,

      0.2, 0.2, 0.5, 0.2, 0.5, 0.4,

      0.2, 0.2, 0.2, 0.4, 0.5, 0.4,

      0.2, 0.6, 0.6, 0.6, 0.6, 0.8,

      0.6, 0.8, 0.2, 0.8, 0.2, 0.6,
    ];

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW
    );
    const positionAttribLocation = this.gl.getAttribLocation(
      this.glProgram,
      "a_position"
    );

    // Tell it to use our program (pair of shaders)
    this.gl.useProgram(this.glProgram);

    const rotationMat = rotate3x3(rotateAngleRad);
    const rotationMatPosition = this.gl.getUniformLocation(
      this.glProgram,
      "u_rotation"
    );
    this.gl.uniformMatrix3fv(rotationMatPosition, false, rotationMat);

    this.gl.vertexAttribPointer(
      positionAttribLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    // Draw the shape
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 18);
  }
}
