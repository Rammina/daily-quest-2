import React from "react";

class GoogleAuth extends React.Component {
  state = {isSignedIn: null}


  componentDidMount() {
    gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId:
          "614367436290-u471mjcmc2jei5u4f8kh0emo19n3q29p.apps.googleusercontent.com",
        scope: "firebase"
      }).then(() => {
        this.auth= window.gapi.auth2.getAuthInstance();
        this.setState( {isSignedIn: this.auth.isSignedIn.get()})
        this.auth.isSignedIn.listen(this.onAuthChange);
      };
    });
  }

  onAuthChange = () => {
    this.setState({isSignedIn: this.auth.isSignedIn.get()})
  };

  onSignInClick = () =>{
    this.auth.signIn();
  }

  onSignOutClick = () =>{
    this.auth.signOut();
  }

  renderAuthButton(){
    if(this.state.isSignedIn === null) {
      return <div></div>
    } else if(this.state.isSignedIn){
      return <div>signed in</div>
    } else{
      return <div>not signed in</div>
    }
  }


  render() {
    return <div style={{ display: "none" }}>Google Auth</div>;
  }
}

export default GoogleAuth;
