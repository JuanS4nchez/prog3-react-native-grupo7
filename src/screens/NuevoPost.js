import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { auth, db } from "../firebase/config";

export default class NuevoPost extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      message: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate("Login");
      }
    });
  }

  handlePost(mensaje) {
    db.collection("posts")
      .add({
        email: auth.currentUser.email,
        mensaje: this.state.message,
        createdAt: Date.now(),
        likes: [],
      })
      .then(() => {
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        alert(this.state.errorMessage);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Posteo</Text>
        <Text style={styles.subtitle}>Completa los siguientes datos:</Text>
        <TextInput
          style={styles.input}
          placeholder="¿Qué estás pensando?"
          onChangeText={(text) => this.setState({ message: text })}
          value={this.state.message}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handlePost(this.state.message)}
        >
          <Text style={styles.buttonText}>Crear Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ECDFCC",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#ECDFCC",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 60,
    borderColor: "#697565",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: "black",
    backgroundColor: "#ECDFCC",
  },
  button: {
    backgroundColor: "#697565",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#697565",
  },
  buttonText: {
    color: "#ECDFCC",
    fontSize: 16,
    fontWeight: "bold",
  },
});
