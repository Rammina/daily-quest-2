import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "636968238547-rd6r7k73599bpuhp58a23mqegrutlk70.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          // gives a ref to the auth instance
          this.auth = window.gapi.auth2.getAuthInstance();
          // update component level state, check if user is signed in or not
          this.onAuthChange();
          // listen for any changes in sign in status, update state
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
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
        className="ui red google button"
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
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
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
    return <div style={{ display: "none" }}>Google Auth</div>;
  }
}

export default GoogleAuth;
