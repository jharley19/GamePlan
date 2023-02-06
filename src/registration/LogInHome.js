import React, { Component } from "react";
import { Platform, UIManager, Text, View, TouchableOpacity, LayoutAnimation } from "react-native";
import styles from './styles';
import { firebase } from "@react-native-firebase/auth";
import LoginComponent from "./LogInComponent";
import SigUpComponent from "./SignUpComponent";
import HomePage from "./HomePage.js";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {};
const tag = "FIREBASE";

export default class LogIn extends Component<Props> {
  state = {
    isLogin: false,
    authenticated: false
  };
  componentDidMount() {
    this.__isTheUserAuthenticated();
  }

  // check to see if user is authenticated, if so set authenticated to true
  __isTheUserAuthenticated = () => {
    let user = firebase.auth().currentUser;
    if (user) {
      console.log(tag, user);
      this.setState({ authenticated: true });
    } else {
      this.setState({ authenticated: false });
    }
  };

  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return (
      <View style={{ flex: 1 }}>
        {this.state.authenticated ? ( // if authenticated, render this screen
          <HomePage />
        ) : ( // if user is not authenticated
          <View style={{ flex: 1 }}>
            {this.state.isLogin ? <LoginComponent /> : <SigUpComponent />}

            <View style={styles.loginButtonContainerStyle}>
              <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.setState(state => ({ isLogin: !state.isLogin }))}>
                <Text style={styles.loginButtonTextStyle}> {this.state.isLogin ? "New? Create account." : "Already have account? Log In"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

