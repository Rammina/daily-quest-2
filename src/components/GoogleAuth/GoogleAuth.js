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
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
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

  renderAuthButton = () => {
    if (this.state.isSignedIn === null) {
      return <div></div>;
    } else if (this.state.isSignedIn) {
      return <div>signed in</div>;
    } else {
      return <div>not signed in</div>;
    }
  };

  render() {
    return <div style={{ display: "none" }}>Google Auth</div>;
  }
}

export default GoogleAuth;
