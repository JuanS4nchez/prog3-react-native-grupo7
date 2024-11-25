import { Text, View, StyleSheet, FlatList, TextInput } from "react-native";
import React, { Component } from "react";
import { db } from "../firebase/config";
import Users from "../components/Users";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      buscador: "",
      usersFiltrados: [],
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let users = [];
      docs.forEach((doc) => {
        users.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        usersFiltrados: users,
        users: users,
        loading: false,
      });
    });
  }

  onHandleFilter(text) {
    const userValue = text;
    this.setState({
      buscador: userValue,
      usersFiltrados: this.state.users.filter((user) =>
        user.data.email.toLowerCase().includes(userValue.toLowerCase())
      ),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          onChangeText={(text) => this.onHandleFilter(text)}
          value={this.state.buscador}
        />
        {this.state.usersFiltrados.length === 0 ? (
          <Text style={styles.notFound}>
            La cuenta con email "{this.state.buscador}" no existe
          </Text>
        ) : (
          <FlatList
            data={this.state.usersFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Users user={item} />}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "black",
  },
  input: {
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 6,
    marginVertical: 10,
    color: "#ECDFCC",
    fontWeight: "bold",
    backgroundColor: "#697565",
    fontSize: 16,
  },
  notFound: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    color: "#ECDFCC",
    textAlign: "center",
  },
});
