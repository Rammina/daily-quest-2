import "./Header.css";

import React from "react";
import { Link } from "react-router-dom";

import NavMenu from "../NavMenu/NavMenu";

import { NavContext } from "../AppContext";

class Header extends React.Component {
  state = {
    menuClass:
      window.innerWidth >= 900
        ? "right menu"
        : "ui inverted right vertical sidebar menu",
    hamburgerClicked: false,
    sidebarClassFromClick: "invisible",
    hamburgerClass: "show",
  };
  static contextType = NavContext;
  // refs
  hamburgerRef = React.createRef();

  // focus functions
  focusHamburger = () => {
    if (this.hamburgerRef.current) {
      this.hamburgerRef.current.focus();
    }
  };

  updateNavMenuClasses = () => {
    console.log(window.innerWidth);
    console.log(this.state.menuClass);
    if (this.state.menuClass) {
      console.log("updating menu class based on width");
      const menuClass =
        window.innerWidth >= 900
          ? "right menu"
          : "ui inverted right vertical sidebar menu";
      if (menuClass !== this.state.menuClass) {
        this.setState({ menuClass });
      }
    }
  };

  updateHamburgerClasses = () => {
    console.log(this.state.hamburgerClass);
    if (this.state.hamburgerClass) {
      console.log("updating menu class based on height");
      const hamburgerClass = window.innerWidth >= 900 ? "hide" : "show";
      if (hamburgerClass !== this.state.hamburgerClass) {
        this.setState({ hamburgerClass });
      }
    }
  };

  showSidebar = () => {
    setTimeout(() => {
      this.setState({
        hamburgerClicked: true,
        sidebarClassFromClick: "visible",
      });
    }, 200);
  };

  hideSidebar = () => {
    setTimeout(() => {
      this.setState({
        hamburgerClicked: false,
        sidebarClassFromClick: "invisible",
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
        <Link data-test="home-link" to="/home" className="item" id="nav-title">
          Daily Quest
        </Link>
        <button
          ref={this.hamburgerRef}
          data-test="nav-hamburger"
          className={`ui icon button item right ${this.state.hamburgerClass}`}
          id="nav-hamburger"
          onClick={() => {
            this.onHamburgerClick();
            setTimeout(() => {
              this.context.navMenuCloseButtonRef.focus();
            }, 230);
          }}
        >
          <i className="bars icon" />
        </button>
        <NavMenu
          menuClass={this.state.menuClass}
          sidebarClassFromClick={this.state.sidebarClassFromClick}
          onBackdropClick={this.onBackdropClick}
          hamburgerRef={this.hamburgerRef}
          focusHamburger={this.focusHamburger}
        />
      </div>
    );
  }
}

export default Header;
