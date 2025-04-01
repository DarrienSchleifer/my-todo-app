import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// list of exercises with type
const exercises = [
  { name: "Push-ups", type: "Repetition" },
  { name: "Squats", type: "Repetition" },
  { name: "Plank", type: "Duration" },
  { name: "Jumping Jacks", type: "Repetition" },
];

export default function DurationExercise({ route, navigation }) {
  // getting exercise name from route params
  const { name } = route.params;

  // state variables to manage time, timer status, and suggested workout
  const [time, setTime] = useState(0); // milliseconds
  const [running, setRunning] = useState(false); // check if the timer is running
  const [suggestedWorkout, setSuggestedWorkout] = useState(null); // random workout suggestion

  useEffect(() => {
    generateNewWorkout();
  }, []);

  // frunction to format time as minutes:seconds.milliseconds
  function formatTime(ms) {
    // Minutes
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
    // Seconds
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    // Milliseconds
    const milliseconds = String(ms % 1000).padStart(3, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
  }

  // function to generate a random workout suggestion
  function generateNewWorkout() {
    let newExercise;
    do {
      newExercise = exercises[Math.floor(Math.random() * exercises.length)];
    } while (newExercise.name === name); // new exercise is not the current one
    setSuggestedWorkout(newExercise); // set the random exercise as the suggestion
  }

  // runs when the timer starts or stops, updating the time
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // increase time by 10ms
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  // function to navigate to the suggested workout
  function goToSuggestedWorkout() {
    if (suggestedWorkout) {
      // navigate to the sugested workout based on its type
      navigation.navigate(
        suggestedWorkout.type === "Repetition"
          ? "RepetitionExercise"
          : "DurationExercise",
        { name: suggestedWorkout.name } // pass name of the suggested exercise
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      {/* display the formatted time */}
      <Text style={styles.count}>Time: {formatTime(time)}</Text>

      {/* buttons for starting and resetting the timer */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setRunning(true)} // start timer
          disabled={running} // disable button if timer is already running
        >
          <Text style={styles.buttonText}>Start Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setTime(0)}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* button to go to the suggested workout (if there is one) */}
      {suggestedWorkout && (
        <TouchableOpacity
          style={styles.suggestButton}
          onPress={goToSuggestedWorkout} // go to the suggested workout
        >
          <Text style={styles.buttonText}>
            Suggested Workout: {suggestedWorkout.name}
          </Text>
        </TouchableOpacity>
      )}

      {/* button to navigate to the home screen */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")} // to home screen
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// styles for the app components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  count: { fontSize: 40, marginVertical: 10, color: "#333" },
  buttonContainer: { marginTop: 20, width: "10%" },
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
