import {
  Text,
  View,
  StyleSheet,
  FieldValue,
  TouchableOpacity,
} from "react-native";
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
      cantLikes: 0,
    };
  }
  like() {
    this.setState({
      like: true,
    });
  }

  unLike() {
    this.setState({
      like: false,
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  postContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
  },
  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});
