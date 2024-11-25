import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
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

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }

  handleLogIn() {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        this.setState({ loggedIn: true, error: "" });
        this.props.navigation.navigate("HomeMenu");
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
        <TouchableOpacity
          onPress={() => this.handleLogIn()}
          style={styles.boton}
        >
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
    flex: 1,
    backgroundColor: "#1E201E", 
  },
  input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#697565", 
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
    color: "#ECDFCC",
    backgroundColor: "#3C3D37",
  },
  boton: {
    backgroundColor: "#697565", 
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#697565",
  },
  text: {
    color: "#ECDFCC", 
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ECDFCC", 
    textAlign: "center",
  },
  link: {
    marginTop: 5,
    color: "#ECDFCC", 
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
  errorMsg: {
    fontSize: 12, 
    color: "#ECDFCC", 
    marginBottom: 10,
    textAlign: "center",
  },
});

