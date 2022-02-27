// an attribute will receive data from a buffer
attribute vec2 a_position;
uniform mat3 u_rotation;

// all shaders have a main function
void main() {
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
    vec2 position = vec2(a_position.xy - 0.3);
    gl_Position = vec4((u_rotation * vec3(a_position, 1)).xy, 0, 1);
    // gl_Position = vec4(position, 0, 1);
}