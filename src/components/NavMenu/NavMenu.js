import "./NavMenu.css";

import React from "react";

class NavMenu extends React.Component {
  state = {
    menuClass: "ui inverted right vertical sidebar menu"
  };

  handleResize = () => {
    if (this.state.menuClass) {
      const menuClass =
        window.innerWidth > 900
          ? "right menu"
          : "ui inverted right vertical sidebar menu";
      if (menuClass !== this.state.menuClass) {
        this.setState({ menuClass });
      }
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div
        data-test="component-nav-menu"
        className={`nav-menu visible ${this.state.menuClass}`}
      >
        <a className="left item">Projects</a>
        <a className="left item active">Due Today</a>
        <a className="left item">Finished Tasks</a>
      </div>
    );
  }
}

export default NavMenu;
