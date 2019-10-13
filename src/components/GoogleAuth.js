import React from "react";

class GoogleAuth extends React.Component {
  componentDidMount() {
    gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId:
          "614367436290-u471mjcmc2jei5u4f8kh0emo19n3q29p.apps.googleusercontent.com",
        scope: "firestore"
      });
    });
  }

  render() {
    return <div style={{ display: "none" }}>Google Auth</div>;
  }
}

export default GoogleAuth;
