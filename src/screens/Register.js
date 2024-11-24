import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { db, auth } from "../firebase/config";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      userName: "",
      registered: false,
      error: "",
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user){
        this.props.navigation.navigate("HomeMenu")
      }
    })
  }

  handleRegister() {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        this.setState({ registered: true });
        db.collection("users")
          .add({
            email: this.state.email,
            userName: this.state.userName,
            createdAt: Date.now(),
          })
          .then(() => this.props.navigation.navigate("Login"))
          .catch((e) => console.log(e));
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "El mail y/o la contraseña son invalidos" });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        {this.state.error !== "" ? (
          <Text style={styles.errorMsg}>{this.state.error}</Text>
        ) : null}
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
        <TextInput
          style={styles.input}
          placeholder="userName"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <TouchableOpacity
          onPress={() => this.handleRegister()}
          style={styles.boton}
        >
          <Text style={styles.text}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.link}>Ir a login</Text>
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
    color: "red",
  },
});
