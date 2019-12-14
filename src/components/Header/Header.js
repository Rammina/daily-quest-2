import "./Header.css";

import React from "react";
import { Link } from "react-router-dom";

import NavMenu from "../NavMenu/NavMenu";

class Header extends React.Component {
  state = {
    menuClass: "right menu",
    hamburgerClicked: false,
    sidebarClassFromClick: "invisible",
    hamburgerClass: "show"
  };

  updateNavMenuClasses = () => {
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

  updateHamburgerClasses = () => {
    if (this.state.hamburgerClass) {
      const hamburgerClass = window.innerWidth > 900 ? "hide" : "show";
      if (hamburgerClass !== this.state.hamburgerClass) {
        this.setState({ hamburgerClass });
      }
    }
  };

  showSidebar = () => {
    setTimeout(() => {
      this.setState({
        hamburgerClicked: true,
        sidebarClassFromClick: "visible"
      });
    }, 200);
  };

  hideSidebar = () => {
    setTimeout(() => {
      this.setState({
        hamburgerClicked: false,
        sidebarClassFromClick: "invisible"
      });
    }, 200);
  };

  onHamburgerClick = () => {
    if (this.state.hamburgerClicked) {
      this.hideSidebar();
    } else {
      this.showSidebar();
    }
  };

  onBackdropClick = () => {
    this.hideSidebar();
  };

  handleResize = () => {
    this.updateNavMenuClasses();
    this.updateHamburgerClasses();
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div
        data-test="component-header"
        className="ui secondary pointing menu header"
      >
        <Link data-test="home-link" to="/" className="item" id="nav-title">
          Daily Quest
        </Link>
        <button
          data-test="nav-hamburger"
          className={`ui icon button item right ${this.state.hamburgerClass}`}
          id="nav-hamburger"
          ref="nav-hamburger"
          onClick={this.onHamburgerClick}
        >
          <i className="bars icon" />
        </button>
        <NavMenu
          menuClass={this.state.menuClass}
          sidebarClassFromClick={this.state.sidebarClassFromClick}
          onBackdropClick={this.onBackdropClick}
        />
      </div>
    );
  }
}

export default Header;
