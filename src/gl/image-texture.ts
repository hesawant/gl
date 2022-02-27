import { ExecuteGLProgramBase } from "./execute-gl-program-base";

export class ImageTexture extends ExecuteGLProgramBase {
  private image: HTMLImageElement = null;

  render() {
    // fetch image and render it on load.
    if (!this.image) {
      this.image = document.createElement("img");
      this.image.onload = () => this.renderImage();
      this.image.src = "assets/images/violet-flower.jpg";
    } else {
      this.renderImage();
    }
  }

  renderImage() {
    if (!this.image) {
      console.log("ImageTexture::renderImage: null image");
      return;
    }

    if (!this.gl) {
      console.log("ImageTexture::renderImage: null gl context");
      return;
    }

    if (!this.glProgram) {
      console.log("ImageTexture::renderImage: null glProgram");
      return;
    }

    // Create and Bind the position buffer.
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // three 2d points
    const positions = [
      -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5,
    ];
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
    const size = 2; // 2 components per iteration
    const type = this.gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0; // start at the beginning of the buffer
    this.gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    // Create and bind texture coordinate bugger.
    const textureCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textureCoordBuffer);

    const texturePositions = [
      0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    ];

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(texturePositions),
      this.gl.STATIC_DRAW
    );

    const textureAttributeLocation = this.gl.getAttribLocation(
      this.glProgram,
      "a_texCoord"
    );
    this.gl.enableVertexAttribArray(textureAttributeLocation);
    this.gl.vertexAttribPointer(
      textureAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    // Create a image texture
    const texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.NEAREST
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.NEAREST
    );

    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      this.image
    );

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
}
