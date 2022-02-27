import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Program } from "../../types";
import { Store, selectProgram } from "../../store";

import "./item.less";

interface PassedProps {
  program: Program;
}

interface MappedProps {
  selectedProgram: Program;
}

interface DispatchProps {
  select: (name: string) => void;
}

type Props = PassedProps & MappedProps & DispatchProps;

class NavItem extends React.Component<Props, undefined> {
  render() {
    const { program, select, selectedProgram } = this.props;
    const className =
      "item " +
      (selectedProgram && selectedProgram.name === program.name
        ? "selected"
        : "");
    return (
      <div className={className} onClick={() => select(program.name)}>
        {program.name}
      </div>
    );
  }
}

const mapStateToProps = (state: Store): MappedProps => {
  return {
    selectedProgram: state.selectedProgram,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    select: (name: string) => dispatch(selectProgram(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavItem);
