import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";
import Posts from "../components/Posts";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState(
          {
            posteos: posts,
            loading: false,
          },
          () => console.log(this.state.posteos)
        );
      });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido a la Home!</Text>
        <Text style={styles.subtitle}>Estás en la página principal.</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Posts posteo={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#d9534f",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
