import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { db } from "../firebase/config";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection("posts")
      .where("email", "==", this.props.user.data.email)
      .onSnapshot((docs) => {
        let currentPosts = [];
        docs.forEach((doc) => {
          currentPosts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: currentPosts,
          loading: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.postContainer}>
          <Text style={styles.email}>{this.props.user.data.email}</Text>
          <Text style={styles.message}>{this.props.user.data.userName}</Text>
          <Text style={styles.message}>
            Cantidad de posts: {this.state.posts.length}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
  },
  postContainer: {
    backgroundColor: "#ECDFCC",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#181C14",
  },
  message: {
    fontSize: 14,
    color: "#181C14",
    marginTop: 5,
  },
});
