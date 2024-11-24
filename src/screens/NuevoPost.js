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
        console.log("Post agregado exitosamente");
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
    backgroundColor: "#f0f4f8", // Color de fondo suave
    justifyContent: "center", // Centrar contenido verticalmente
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10, // Espacio inferior
    textAlign: "center", // Centrar el texto
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20, // Espacio inferior
    textAlign: "center", // Centrar el texto
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20, // Espacio inferior
    backgroundColor: "#ffffff", // Fondo blanco para el input
  },
  button: {
    backgroundColor: "#28a745", // Color de fondo del botón
    padding: 15,
    borderRadius: 8,
    alignItems: "center", // Centrar texto dentro del botón
  },
  buttonText: {
    color: "#ffffff", // Color del texto del botón
    fontSize: 16,
    fontWeight: "bold",
  },
});
