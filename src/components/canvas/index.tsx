import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { updateCanvas, Store } from "../../store";

import "./index.less";

interface MappedProps {
  canvasKey: number;
}

interface DispatchProps {
  updateCanvasElement: (canvas: HTMLCanvasElement) => void;
}

type Props = MappedProps & DispatchProps;

class Canvas extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.updateCanvasElement = this.updateCanvasElement.bind(this);
  }

  render() {
    return (
      <canvas
        key={this.props.canvasKey}
        className="canvas"
        ref={this.updateCanvasElement}
      />
    );
  }

  private updateCanvasElement(canvas: HTMLCanvasElement) {
    if (!canvas) return;

    const { updateCanvasElement } = this.props;
    updateCanvasElement(canvas);
    console.log("Updated canvas element");
  }
}

const mapStateToProps = (state: Store): MappedProps => {
  return {
    canvasKey: state.canvasKey,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateCanvasElement: (canvas: HTMLCanvasElement) =>
      dispatch(updateCanvas(canvas)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
