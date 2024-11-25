import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { auth, db } from "../firebase/config";
import Posts from "../components/Posts";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      currentPosts: [],
      userName: "",
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("posts")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let currentPosts = [];
        docs.forEach((doc) => {
          currentPosts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        currentPosts.sort((a, b) => b.data.createdAt - a.data.createdAt);
        this.setState({
          posts: currentPosts,
          loading: false,
        });
      });
    db.collection("users")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let users = [];
        docs.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(users[0]);
        this.setState({
          userName: users[0].data.userName,
        });
      });
  }

  handleLogOut() {
    auth.signOut().then(this.props.navigation.navigate("Login"));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.main}>¡Estas en el perfil!</Text>
        <Text style={styles.title}>{this.state.userName}</Text>
        <Text style={styles.subtitle}>{auth.currentUser.email}</Text>
        <Text style={styles.text}>
          Cantidad de posteos: {this.state.posts.length}
        </Text>
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Posts posteo={item} />}
        />
        <TouchableOpacity
          onPress={() => this.handleLogOut()}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Desloguearme</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    backgroundColor: "black",
  },
  main: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ECDFCC",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ECDFCC",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#ECDFCC",
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    color: "#ECDFCC",
  },
  logoutButton: {
    backgroundColor: "#697565",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#697565",
  },
  logoutText: {
    color: "#ECDFCC",
    fontWeight: "bold",
    fontSize: 16,
  },
});
