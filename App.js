import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import Home from "./screens/Home";
import RepetitionExercise from "./screens/RepetitionExercise";
import DurationExercise from "./screens/DurationExercise";

export default function App() {
  // screen state keeps track of which screen is active
  const [screen, setScreen] = React.useState("Home");

  // exercise state stores data for the current exercise
  const [exercise, setExercise] = React.useState(null);

  // function to change screens
  // updates screen state and stores any exercise data
  function navigate(screenName, params = {}) {
    setExercise(params);
    setScreen(screenName);
  }

  // determines which screen to display based on screen state
  let ScreenComponent;

  if (screen === "Home") {
    ScreenComponent = <Home navigation={{ navigate }} />;
  } else if (screen === "RepetitionExercise") {
    ScreenComponent = (
      <RepetitionExercise
        route={{ params: exercise }}
        navigation={{ navigate }}
      />
    );
  } else if (screen === "DurationExercise") {
    ScreenComponent = (
      <DurationExercise
        route={{ params: exercise }}
        navigation={{ navigate }}
      />
    );
  }

  // renders the selected screen inside a safeareaview
  return (
    <SafeAreaView style={styles.container}>{ScreenComponent}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // takes up the full available space
  },
});
