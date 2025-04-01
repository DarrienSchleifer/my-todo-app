import React from "react";
import {
  SafeAreaView, // container that ensures the content displayed on iOS device
  View,
  Text,
  TouchableOpacity, // touchable element used for buttons
  StyleSheet,
} from "react-native";

export default function Home({ navigation }) {
  // main screen of the app
  // navigation prop that lets us navigate between screens

  return (
    <SafeAreaView style={styles.container}>
      {/* title  */}
      <Text style={styles.title}>Workout App</Text>

      {/* button for startin pushups */}
      <TouchableOpacity
        style={styles.button} // button styles
        onPress={() =>
          navigation.navigate("RepetitionExercise", { name: "Push ups" })
        }
      >
        <Text style={styles.buttonText}>Start Push Ups</Text>
      </TouchableOpacity>

      {/* button for squats */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("RepetitionExercise", { name: "Squats" })
        }
      >
        <Text style={styles.buttonText}>Start Squats</Text>
      </TouchableOpacity>

      {/* button for starting plank */}
      <TouchableOpacity
        style={styles.button} // button styles
        onPress={() =>
          navigation.navigate("DurationExercise", { name: "Plank" })
        }
      >
        <Text style={styles.buttonText}>Start Plank</Text>
      </TouchableOpacity>

      {/* button for starting jumping jacks  */}
      <TouchableOpacity
        style={styles.button} //
        onPress={() =>
          navigation.navigate("RepetitionExercise", { name: "Jumping Jacks" })
        }
      >
        <Text style={styles.buttonText}>Start Jumping Jacks</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// styles for the components in homescreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#807bff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
    width: "10%",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
