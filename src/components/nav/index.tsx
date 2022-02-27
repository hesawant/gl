import * as React from "react";
import { connect } from "react-redux";

import { Program } from "../../types";
import { Store } from "../../store";
import NavItem from "./item";

interface MappedProps {
  programs: Program[];
}

type Props = MappedProps;

class Nav extends React.Component<Props, undefined> {
  render() {
    const { programs } = this.props;
    return programs.map((program, index) => (
      <NavItem key={index} program={program} />
    ));
  }
}

const mapStateToProps = (state: Store): MappedProps => {
  return {
    programs: state.programs,
  };
};

export default connect(mapStateToProps)(Nav);
