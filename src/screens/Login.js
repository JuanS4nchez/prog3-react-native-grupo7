import React, { Component } from "react";
import {View,Text,TouchableOpacity,TextInput, StyleSheet} from "react-native";
import { db, auth } from "../firebase/config";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      error: "",
    };
  }

  handleLogIn() {
    console.log(this.state.email)
    console.log(this.state.password)
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        this.setState({loggedIn: true, error: "" })
        this.props.navigation.navigate("Register")
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "El mail y/o la contraseña son incorrectos" });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {this.state.error !== "" ? <Text style={styles.errorMsg}>{this.state.error}</Text> : null}
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity onPress={() => this.handleLogIn()} style={styles.boton}>
          <Text style={styles.text}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.link}>Ir a Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
    flex: 1,
  },
  input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },
  boton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  link: {
    marginTop: 5,
    color: "#007bff",
    fontSize: 16,
    fontStyle: "italic",
  },
  errorMsg: {
    fontSize: 10,
    color: "red"
  }
});
