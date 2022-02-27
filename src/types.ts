export enum ShaderType {
  FRAGMENT_SHADER,
  VERTEX_SHADER,
}

export interface Shader {
  fileName: string;
  type: ShaderType;
  source: string;
}

export interface Program {
  name: string;
  vertexShader: Shader;
  fragmentShader: Shader;
}
