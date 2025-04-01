import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// array of exercises with name and type
const exercises = [
  { name: "Push-ups", type: "Repetition" },
  { name: "Squats", type: "Repetition" },
  { name: "Plank", type: "Duration" },
  { name: "Jumping Jacks", type: "Repetition" },
];

export default function RepetitionExercise({ route, navigation }) {
  // getting the exercise name from the previous screen
  const { name } = route.params;

  // state for tracking rep count
  const [count, setCount] = useState(0);

  // state for storing the next workout suggestion
  const [suggestedWorkout, setSuggestedWorkout] = useState(null);

  // runs once when the component mounts
  useEffect(() => {
    generateNewWorkout();
  }, []); // empty array means it only runs once

  // generates a random workout that isnt the current one
  function generateNewWorkout() {
    let newExercise;
    do {
      newExercise = exercises[Math.floor(Math.random() * exercises.length)];
    } while (newExercise.name === name); // make sure it's different

    setSuggestedWorkout(newExercise);
  }

  // navigates to suggested workout screen
  function goToSuggestedWorkout() {
    if (suggestedWorkout) {
      navigation.navigate(
        suggestedWorkout.type === "Repetition"
          ? "RepetitionExercise"
          : "DurationExercise",
        { name: suggestedWorkout.name }
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* displays current exercise name */}
      <Text style={styles.title}>{name}</Text>

      {/* displays current rep count */}
      <Text style={styles.count}>Reps: {count}</Text>

      <View style={styles.buttonContainer}>
        {/* button increase reps */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>increase reps</Text>
        </TouchableOpacity>

        {/* button to reset reps */}
        <TouchableOpacity style={styles.button} onPress={() => setCount(0)}>
          <Text style={styles.buttonText}>reset</Text>
        </TouchableOpacity>
      </View>

      {/* button to start the suggested workout */}
      {suggestedWorkout && (
        <TouchableOpacity
          style={styles.suggestButton}
          onPress={goToSuggestedWorkout}
        >
          <Text style={styles.buttonText}>
            suggested workout: {suggestedWorkout.name}
          </Text>
        </TouchableOpacity>
      )}

      {/* button to go back to home screen */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // center horizontally
    justifyContent: "center", // center vertically
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  count: {
    fontSize: 20,
    marginVertical: 10,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
    width: "10%",
  },
  button: {
    backgroundColor: "#807bff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
  },
  suggestButton: {
    backgroundColor: "#88a745",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#8c757d",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
