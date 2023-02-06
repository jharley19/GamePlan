import React, { useState } from "react";
import {  Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator, TextInput, Alert } from "react-native";
import styles from './styles';
import auth from "@react-native-firebase/auth";
const blue = "#ff0000";
import HomePage from "./HomePage.js";

export default function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState("");
    const [isValid, setValid] = useState(true);

    const __doLogin = () => {
      if (!email) {
        setError("Email required *");
        setValid(false);
        return;
      } else if (!password && password.trim() && password.length > 6) {
        setError("Weak password, minimum 5 chars");
        setValid(false);
        return;
      } else if (!__isValidEmail(email)) {
        setError("Invalid Email");
        setValid(false);
        return;
      }
      let signInRequestData = {
        email,
        password
      };
  
      __doSingIn(email, password);
    };
  
    const __doSingIn = async (email, password) => {
      try {
        let response = await auth().signInWithEmailAndPassword(email, password);
        if (response && response.user) {
          Alert.alert("Success ✅", "Logged successfully");
          <HomePage />
        }
      } catch (e) {
        console.error(e.message);
      }
    };
  
    return (
      <SafeAreaView style={styles.containerStyle}>
        <View style={{ flex: 0.2 }}>{!!fetching && <ActivityIndicator color={blue} />}</View>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.headerTitleStyle}> Log In </Text>
        </View>
        <View style={styles.formContainerStyle}>
          <TextInput
            label={"Email"}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.textInputStyle}
            placeholder="Email address"
            onChangeText={text => {
              setValid(__isValidEmail(text));
              setEmail(text);
            }}
            error={isValid}
          />
          <TextInput label={"Password"} secureTextEntry autoCapitalize="none"style={styles.textInputStyle} selectionColor={blue} placeholder="Password" error={isValid} onChangeText={text => setPassword(text)} />
        </View>
        {error ? (
          <View style={styles.errorLabelContainerStyle}>
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        ) : null}
  
        <View style={styles.signInButtonContainerStyle}>
          <TouchableHighlight style={styles.signInButtonStyle} onPress={__doLogin} underlayColor={blue}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={styles.signInButtonTextStyle}>Continue</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  };

  const __isValidEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };