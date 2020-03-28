import React from "react";
import { connect } from "react-redux";
import { googleSignIn, googleSignOut } from "../../actions";
import { GoogleAuthContext } from "../AppContext";
import history from "../../history";

class GoogleAuth extends React.Component {
  static contextType = GoogleAuthContext;

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          // just change the client ID for a different project
          clientId:
            "636968238547-rd6r7k73599bpuhp58a23mqegrutlk70.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          // gives a ref to the auth instance
          this.auth = window.gapi.auth2.getAuthInstance();
          // update redux state, check if user is signed in or not
          this.onAuthChange(this.auth.isSignedIn.get());
          // listen for any changes in sign in status, update state
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = async isSignedIn => {
    // set the sign-in check to false
    if (this.context.signInChecked) {
      this.context.setSignInChecked(false);
    }
    this.context.showLoaderBeforeCheck();
    // sign in or sign out
    if (isSignedIn) {
      await this.props.googleSignIn(this.auth.currentUser.get().getId());
      // get the URL parameter value
      if (window.location.pathname.includes("/login-page")) {
        history.push("/home");
      }
    } else {
      await this.props.googleSignOut();
      history.push("/login-page");
    }
    // make the loader fade after changing sign in status
    this.context.setSignInChecked(true);
    this.context.fadeLoaderAfterCheck();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderGoogleSignButton = (text, cb) => {
    return (
      <button
        className={`ui primary google button ${this.props.buttonClass || null}`}
        id={this.props.buttonId || ""}
        onClick={() => {
          if (cb) {
            cb();
          }
        }}
      >
        <i className="google icon" />
        {text}
      </button>
    );
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
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

const mapStateToProps = state => {
  return { isSignedIn: state.googleAuth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { googleSignIn, googleSignOut }
)(GoogleAuth);
