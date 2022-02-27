import * as React from "react";
import * as ReactDOM from "react-dom";

// Below block of code enables Hot module replacement only for local debugging.
declare const WEBPACK_DEFINE_ENABLE_HMR;
if (WEBPACK_DEFINE_ENABLE_HMR) {
  require("react-hot-loader/patch");
}
import { AppContainer } from "react-hot-loader";

import store, { addProgram, selectProgram } from "./store";
import { ShaderType } from "./types";
import { fetchFragmentSource } from "./fetchers/fetch-fragment-source";
import App from "./app";

const initStoreAndRender = async () => {
  store.dispatch(
    addProgram({
      name: "Simple blue triangle",
      vertexShader: {
        fileName: "assets/shaders/vertex/simple-blue-triangle.glsl",
        type: ShaderType.VERTEX_SHADER,
        source: await fetchFragmentSource(
          "assets/shaders/vertex/simple-blue-triangle.glsl"
        ),
      },
      fragmentShader: {
        fileName: "assets/shaders/fragment/simple-blue-triangle.glsl",
        type: ShaderType.FRAGMENT_SHADER,
        source: await fetchFragmentSource(
          "assets/shaders/fragment/simple-blue-triangle.glsl"
        ),
      },
    })
  );

  store.dispatch(
    addProgram({
      name: "Simple gradient color triangle",
      vertexShader: {
        fileName: "assets/shaders/vertex/simple-gradient-color-triangle.glsl",
        type: ShaderType.VERTEX_SHADER,
        source: await fetchFragmentSource(
          "assets/shaders/vertex/simple-gradient-color-triangle.glsl"
        ),
      },
      fragmentShader: {
        fileName: "assets/shaders/fragment/simple-gradient-color-triangle.glsl",
        type: ShaderType.FRAGMENT_SHADER,
        source: await fetchFragmentSource(
          "assets/shaders/fragment/simple-gradient-color-triangle.glsl"
        ),
      },
    })
  );

  store.dispatch(
    addProgram({
      name: "Image texture",
      vertexShader: {
        fileName: "assets/shaders/vertex/image-texture.glsl",
        type: ShaderType.VERTEX_SHADER,
        source: await fetchFragmentSource(
          "assets/shaders/vertex/image-texture.glsl"
        ),
      },
      fragmentShader: {
        fileName: "assets/shaders/fragment/image-texture.glsl",
        type: ShaderType.FRAGMENT_SHADER,
        source: await fetchFragmentSource(
          "assets/shaders/fragment/image-texture.glsl"
        ),
      },
    })
  );

  store.dispatch(
    addProgram({
      name: "F-Transforms",
      vertexShader: {
        fileName: "assets/shaders/vertex/f-transforms.glsl",
        type: ShaderType.VERTEX_SHADER,
        source: await fetchFragmentSource(
          "assets/shaders/vertex/f-transforms.glsl"
        ),
      },
      fragmentShader: {
        fileName: "assets/shaders/fragment/f-transforms.glsl",
        type: ShaderType.FRAGMENT_SHADER,
        source: await fetchFragmentSource(
          "assets/shaders/fragment/f-transforms.glsl"
        ),
      },
    })
  );

  store.dispatch(selectProgram("Simple blue triangle"));

  /* Initial render */
  render(App);
};

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("container")
  );
};

initStoreAndRender();

if ((module as any).hot) {
  (module as any).hot.accept("./app", () => {
    const NextApp = require("./app").default;
    render(NextApp);
  });
}
