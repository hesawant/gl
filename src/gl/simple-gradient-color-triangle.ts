import { ExecuteGLProgramBase } from "./execute-gl-program-base";

export class SimpleGradientColorTriangle extends ExecuteGLProgramBase {
  render() {
    if (!this.gl) {
      console.log("ExecuteGLProgram::functionToPullOut: null gl context");
      return;
    }

    if (!this.glProgram) {
      console.log("ExecuteGLProgram::functionToPullOut: null glProgram");
      return;
    }

    // Create and Bind the position buffer.
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // three 2d points
    const positions = [-0.5, -0.5, 0.5, -0.5, -0.5, 0.5];
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW
    );

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    this.gl.useProgram(this.glProgram);

    const positionAttributeLocation = this.gl.getAttribLocation(
      this.glProgram,
      "a_position"
    );
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 2; // 2 components per iteration
    let type = this.gl.FLOAT; // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0; // start at the beginning of the buffer
    this.gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    // Creating color buffer and bind it
    const colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);

    const colors = [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1];

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(colors),
      this.gl.STATIC_DRAW
    );

    const colorAttribPointer = this.gl.getAttribLocation(
      this.glProgram,
      "a_color"
    );
    this.gl.enableVertexAttribArray(colorAttribPointer);

    size = 4;
    type = this.gl.FLOAT;
    normalize = false;
    stride = 0;
    offset = 0;
    this.gl.vertexAttribPointer(
      colorAttribPointer,
      size,
      type,
      normalize,
      stride,
      offset
    );

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }
}
