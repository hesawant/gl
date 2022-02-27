import { find, findIndex } from "lodash";
import { createStore } from "redux";
import { createAction, createReducer } from "redux-act";

import { Program } from "../types";
import {
  glCreateAndExecuteGLProgram,
  glUpdateCanvasElement,
  glUpdateProgram,
} from "../gl";

export interface Store {
  programs: Program[];
  selectedProgram: Program;
  canvas: HTMLCanvasElement;
  canvasKey: number;
}

export const initialStore: Store = {
  programs: [],
  selectedProgram: null,
  canvas: null,
  canvasKey: 0,
};

export const addProgram = createAction<Program>(
  "Adds a new program to the store"
);
export const removeProgram = createAction<string>(
  "Remove a program from the store by name"
);
export const selectProgram = createAction<string>("Select a program by name");
export const updateCanvas = createAction<HTMLCanvasElement>(
  "Updates the canvas element on which graphics is rendered"
);

export const reducer = createReducer<Store>({}, initialStore)
  .on(addProgram, (state: Store, program: Program) => {
    const newState = { ...state };
    newState.programs.push(program);
    return newState;
  })
  .on(removeProgram, (state: Store, name: string) => {
    const newState = { ...state };
    const index = findIndex(
      newState.programs,
      (program) => program.name === name
    );
    newState.programs.splice(index, 1);
    return newState;
  })
  .on(selectProgram, (state: Store, name: string) => {
    const newState = { ...state };
    const selectedProgram = find(
      newState.programs,
      (program) => program.name === name
    );

    if (newState.canvas) {
      glCreateAndExecuteGLProgram(newState.canvas, selectedProgram);
      glUpdateProgram(selectedProgram);
    }

    return {
      ...newState,
      selectedProgram,
      // Use 👇 when creating a new fragment/vertex shader to ensure fresh canvas
      // canvasKey: newState.canvasKey + 1
    };
  })
  .on(updateCanvas, (state: Store, canvas: HTMLCanvasElement) => {
    if (!state.canvas) {
      glCreateAndExecuteGLProgram(canvas, state.selectedProgram);
    } else {
      glUpdateCanvasElement(state.selectedProgram.name, canvas);
    }

    return {
      ...state,
      canvas,
    };
  });

const store = createStore(reducer);
export default store;
