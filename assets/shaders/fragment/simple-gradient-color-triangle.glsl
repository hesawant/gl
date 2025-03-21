// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;

varying vec4 v_color;

void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    gl_FragColor = v_color;
    // gl_FragColor = vec4(1, 0, 0, 1);
}