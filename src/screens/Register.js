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
      errorMail: "",
      errorPass: "",
      errorName: "",
      error: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu");
      }
    });
  }

  validateEmail() {
    return this.state.email.includes("@");
  }

  validatePass() {
    return this.state.password.length >= 6;
  }

  validateUserName() {
    return this.state.userName !== "";
  }

  handleEmail() {
    const email = this.state.email;
    if (email === "") {
      this.setState({ errorMail: "el email no puede estar vacio" });
      return false;
    } else if (!this.validateEmail(email)) {
      this.setState({ errorMail: "el email debe contener @" });
      return false;
    } else {
      this.setState({ errorMail: "" });
      return true;
    }
  }

  handlePass() {
    const password = this.state.password;
    if (password === "") {
      this.setState({ errorPass: "la constraseña no puede estar vacia" });
      return false;
    } else if (!this.validatePass(password)) {
      this.setState({
        errorPass: "la contraseña debe tener mas de 6 caracteres",
      });
      return false;
    } else {
      this.setState({ errorPass: "" });
      return true;
    }
  }

  isFormValid() {
    const { email, password, userName } = this.state;
    return email !== "" && password !== "" && userName !== "";
  }

  handleRegister() {
    const isEmailValid = this.handleEmail();
    const isPasswordValid = this.handlePass();
    if (isEmailValid && isPasswordValid) {
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        {this.state.errorMail ? (
          <Text style={styles.errorMsg}>{this.state.errorMail}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        {this.state.errorPass ? (
          <Text style={styles.errorMsg}>{this.state.errorPass}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />
        <TouchableOpacity
          disabled={!this.isFormValid()}
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
    paddingVertical: 10,
    flex: 1,
    backgroundColor: "black",
  },
  input: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#697565",
    borderRadius: 6,
    marginVertical: 10,
    backgroundColor: "#ECDFCC",
    color: "#181C14",
  },
  boton: {
    backgroundColor: "#697565",
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#697565",
  },
  text: {
    color: "#ECDFCC",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ECDFCC",
    textAlign: "center",
  },
  link: {
    marginTop: 10,
    color: "#ECDFCC",
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
  errorMsg: {
    fontSize: 12,
    color: "#FF6B6B",
    marginVertical: 5,
  },
});
