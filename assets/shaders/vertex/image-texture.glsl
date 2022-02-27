// an attribute will receive data from a buffer
attribute vec2 a_position;

attribute vec2 a_texCoord;
varying vec2 v_texCoord;

// all shaders have a main function
void main() {
  
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
    gl_Position = vec4(a_position.x, -a_position.y, 0, 1);
    v_texCoord = a_texCoord;
}