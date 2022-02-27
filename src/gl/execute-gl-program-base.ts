import { Program, ShaderType } from "../types";

export abstract class ExecuteGLProgramBase {
  protected canvas: HTMLCanvasElement;
  protected program: Program;
  protected gl?: WebGLRenderingContext;
  protected glProgram?: WebGLProgram;

  constructor(canvas: HTMLCanvasElement, program: Program) {
    this.canvas = canvas;
    this.program = program;

    if (!this.initGl()) return;
    if (!this.createGlProgram()) return;

    this.render();
  }

  setCanvas(canvas: HTMLCanvasElement): boolean {
    if (!canvas) return false;

    this.canvas = canvas;
    if (!this.initGl()) return false;
    this.initCanvasBufferSize();
    if (!this.createGlProgram()) return false;
    this.render();
    return true;
  }

  setProgram(program: Program): boolean {
    this.program = program;
    if (!this.createGlProgram()) return false;
    this.render();
    return true;
  }

  protected abstract render(): void;

  private initGl() {
    this.gl = this.canvas.getContext("webgl");

    if (!this.gl) {
      console.log("canvas.getContext(webgl2) failed");
      return false;
    }

    this.initCanvasBufferSize();

    return true;
  }

  private createGlShader(type: ShaderType) {
    if (!this.gl) return null;

    let glShaderType = this.gl.VERTEX_SHADER;
    let shader = this.program.vertexShader;

    if (type === ShaderType.FRAGMENT_SHADER) {
      glShaderType = this.gl.FRAGMENT_SHADER;
      shader = this.program.fragmentShader;
    }

    const glShader = this.gl.createShader(glShaderType);
    this.gl.shaderSource(glShader, shader.source);
    this.gl.compileShader(glShader);

    const success = this.gl.getShaderParameter(
      glShader,
      this.gl.COMPILE_STATUS
    );
    if (success) {
      return glShader;
    }

    const infoLog = this.gl.getShaderInfoLog(glShader);
    console.log("ExecuteGLProgram::createShader: ", infoLog);
    return null;
  }

  private createGlProgram() {
    if (!this.gl) return false;

    const vertexShader = this.createGlShader(ShaderType.VERTEX_SHADER);
    const fragmentShader = this.createGlShader(ShaderType.FRAGMENT_SHADER);

    this.glProgram = this.gl.createProgram();
    this.gl.attachShader(this.glProgram, vertexShader);
    this.gl.attachShader(this.glProgram, fragmentShader);

    this.gl.linkProgram(this.glProgram);
    const success = this.gl.getProgramParameter(
      this.glProgram,
      this.gl.LINK_STATUS
    );

    if (success) return true;

    this.glProgram = null;
    const infoLog = this.gl.getProgramInfoLog(this.glProgram);
    console.log("ExecuteGLProgram::createProgram: ", infoLog);

    return false;
  }

  private initCanvasBufferSize() {
    // Lookup the size the browser is displaying the canvas.
    const displayWidth = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (
      this.canvas.width !== displayWidth ||
      this.canvas.height !== displayHeight
    ) {
      // Make the canvas the same size
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }
  }
}
