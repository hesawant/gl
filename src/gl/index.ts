import { Program } from "../types";
import { ExecuteGLProgramBase } from "./execute-gl-program-base";
import { SimpleBlueTriangle } from "./simple-blue-triangle";
import { SimpleGradientColorTriangle } from "./simple-gradient-color-triangle";
import { ImageTexture } from "./image-texture";
import { FTransforms } from "./f-transforms";

const executeGLPrograms: { [key: string]: ExecuteGLProgramBase } = {};

export const glCreateAndExecuteGLProgram = (
  canvas: HTMLCanvasElement,
  program: Program
) => {
  if (executeGLPrograms[program.name]) return;

  if (program.name === "Simple blue triangle") {
    executeGLPrograms[program.name] = new SimpleBlueTriangle(canvas, program);
  } else if (program.name === "Simple gradient color triangle") {
    executeGLPrograms[program.name] = new SimpleGradientColorTriangle(
      canvas,
      program
    );
  } else if (program.name === "Image texture") {
    executeGLPrograms[program.name] = new ImageTexture(canvas, program);
  } else if (program.name === "F-Transforms") {
    executeGLPrograms[program.name] = new FTransforms(canvas, program);
  }
};

export const glUpdateCanvasElement = (
  name: string,
  canvas: HTMLCanvasElement
) => {
  if (!executeGLPrograms[name]) return;

  executeGLPrograms[name].setCanvas(canvas);
};

export const glUpdateProgram = (program: Program) => {
  if (!executeGLPrograms[program.name]) return;

  executeGLPrograms[program.name].setProgram(program);
};
