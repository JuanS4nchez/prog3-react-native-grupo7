import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { auth, db } from "../firebase/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import AntDesign1 from "@expo/vector-icons/AntDesign";
import firebase from "firebase";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      cantLikes: this.props.posteo.data.likes.length,
    };
  }

  componentDidMount() {
    if (this.props.posteo.data.likes.includes(auth.currentUser.email)) {
      this.setState({
        like: true,
      });
    }
  }

  deletePost = () => {
    db.collection("posts")
      .doc(this.props.posteo.id)
      .delete()
      .then(() => {
        console.log("Post eliminado");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  like() {
    db.collection("posts")
      .doc(this.props.posteo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          like: true,
          cantLikes: this.props.posteo.data.likes.length,
        });
      });
  }

  unLike() {
    db.collection("posts")
      .doc(this.props.posteo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        this.setState({
          like: false,
          cantLikes: this.props.posteo.data.likes.length,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.postContainer}>
          <Text style={styles.email}>{this.props.posteo.data.email}</Text>
          <Text style={styles.message}>{this.props.posteo.data.mensaje}</Text>
          {this.state.like ? (
            <TouchableOpacity onPress={() => this.unLike()}>
              <AntDesign name="like1" size={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.like()}>
              <AntDesign1 name="like2" size={24} />
            </TouchableOpacity>
          )}
          <Text>Cant de Likes: {this.state.cantLikes}</Text>
          {auth.currentUser.email == this.props.posteo.data.email ? (
            <TouchableOpacity
              onPress={() => this.deletePost()}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Borrar Posteo</Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#black",
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
  deleteButton: {
    backgroundColor: "#3C3D37",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  deleteText: {
    color: "#ECDFCC",
    fontWeight: "bold",
    fontSize: 12,
  },
});
