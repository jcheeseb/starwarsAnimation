import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  FlatList,
  Image,
  Animated,
} from "react-native";

function AnimatedFilmItem({ item, index }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: index * 200, // Delay each item by 200ms
      useNativeDriver: true,
    }).start();
  }, [animatedValue, index]);

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0], // Start 20px below and move up
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.filmContainer, animatedStyle]}>
      <Text style={styles.filmTitle}>{item.name}</Text>
      <Text style={styles.filmDetails}>UID: {item.uid}</Text>
      <Text style={styles.filmDetails}>URL: {item.url}</Text>
    </Animated.View>
  );
}

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://swapi.tech/api/films/");
        const data = await response.json();
        setFilms(data.results);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("./movie-slate-film-reel-wood-clapper-wooden-backgorund-36502412.jpg.webp")}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Films"
          placeholderTextColor="gray"
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You searched for: {inputText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={films}
          keyExtractor={(item) => item.uid}
          renderItem={({ item, index }) => (
            <AnimatedFilmItem item={item} index={index} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    marginRight: 10,
  },
  filmContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "darkgray",
    borderRadius: 8,
  },
  filmTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  filmDetails: {
    fontSize: 14,
    color: "lightgray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
