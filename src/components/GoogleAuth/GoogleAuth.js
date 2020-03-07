import React from "react";
import { connect } from "react-redux";
import { googleSignIn, googleSignOut } from "../../actions";

class GoogleAuth extends React.Component {
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

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.googleSignIn();
    } else {
      this.props.googleSignOut();
    }
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
