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
      currentPosts: [],
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
        () => console.log(this.state.posts)
      });
  }

  handleLogOut() {
    auth.signOut().then(this.props.navigation.navigate("Login"));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{auth.currentUser.email}</Text>
        <Text style={styles.subtitle}>Cantidad de posteos: </Text>
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
    marginTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
