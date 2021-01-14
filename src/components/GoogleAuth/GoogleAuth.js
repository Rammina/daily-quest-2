import React from "react";
import { connect } from "react-redux";
import { authSignIn, authSignOut } from "../../actions";
import { AuthContext } from "../AppContext";
import history from "../../history";

class GoogleAuth extends React.Component {
  _isMounted = false;
  state = {
    // isMounted: false,
    initialized: false,
  };
  static contextType = AuthContext;

  componentDidMount() {
    this._isMounted = true;
    console.log(`ismounted is now ${this._isMounted}`);
    // this.setState({ isMounted: true });
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          // gives a ref to the auth instance
          this.auth = window.gapi.auth2.getAuthInstance();
          // update redux state, check if user is signed in or not
          this.onAuthChange(this.auth.isSignedIn.get());
          // listen for any changes in sign in status, update state
          this.auth.isSignedIn.listen(this.onAuthChange);
          // change the state so that it knows that it finished initializing

          // note :\colon this causes memory leak issues on redirect
          console.log(`ismounted is now ${this._isMounted}`);
          if (this._isMounted) {
            this.setState({ initialized: true });
          }
        });
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
    console.log(`ismounted is now ${this._isMounted}`);
    // this.setState({ isMounted: false, initialized: false });
    // this.auth.isSignedIn.listen();
  }

  onAuthChange = async (isSignedIn) => {
    // set the sign-in check to false
    if (this.context.signInChecked) {
      this.context.userHasAuthenticated(false);
    }
    this.context.showLoaderBeforeCheck();
    // sign in or sign out
    if (isSignedIn) {
      await this.props.authSignIn({
        authMethod: "googleAuth",
        userId: this.auth.currentUser.get().getId(),
      });
      this.context.userHasAuthenticated(true);
    } else {
    }
    // make the loader fade after changing sign in status
    this.context.setAuthSignInChecked(true);
    this.context.fadeLoaderAfterCheck();
  };

  onSignInClick = () => {
    this.auth.signIn();
    this.context.userHasAuthenticated(true);
  };

  onSignOutClick = async () => {
    await this.auth.signOut();
    await this.props.authSignOut();
    this.context.userHasAuthenticated(false);
  };

  renderGoogleSignButton = (text, cb) => {
    return (
      <button
        ref={this.props.setLastNavMenuItemRef || null}
        className={`ui primary google button ${this.props.buttonClass || null}`}
        id={this.props.buttonId || ""}
        onClick={() => {
          if (cb) {
            cb();
          }
        }}
        onKeyDown={(e) => {
          // only trigger this if non-\ desktop view, and if this is a nav item
          if (window.innerWidth < 900 && this.props.setLastNavMenuItemRef) {
            if (e.key === "Tab" && !e.shiftKey) {
              e.preventDefault();
              e.stopPropagation();
              // put the element to focus here
              if (this.props.navMenuCloseButtonRef) {
                this.props.navMenuCloseButtonRef.focus();
              }
            }
          }
        }}
      >
        <i className="google icon" />
        {text}
      </button>
    );
  };

  renderAuthButton = () => {
    if (!this.state.initialized) {
      console.log("rendering null until auth state is initialized");
      return null;
    }
    if (this.props.isSignedIn) {
      return this.renderGoogleSignButton("Sign Out", () => {
        this.onSignOutClick();
      });
    } else {
      return this.renderGoogleSignButton("Sign In w/ Google", () => {
        this.onSignInClick();
      });
    }
  };

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    authMethod: state.auth.authMethod,
  };
};

export default connect(mapStateToProps, { authSignIn, authSignOut })(
  GoogleAuth
);

/*
// this is for automatic logout based on auth change (instead of on onClick)
if (!this.props.authMethod === null) {
  console.log("this should sign out");
  await this.props.authSignOut();
}

*/
