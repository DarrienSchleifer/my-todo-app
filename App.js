import React, { useState } from "react";
import {
  SafeAreaView, //wrap main container
  StyleSheet, // define style
  FlatList, // render task list
  TextInput, // user input
  Button, // add tasks
  View, // layout structuring
  Text, // display text
} from "react-native";
import { CheckBox } from "@rneui/themed"; // checkbox

export default function App() {
  // state to keep track of tasks
  const [tasks, setTasks] = useState([
    { id: "1", description: "Buy groceries", completed: false },
    { id: "2", description: "Go to the gym", completed: false },
  ]);

  // state to keep track of the new task being added
  const [newTask, setNewTask] = useState("");

  // function to mark a task as complete or incomplete
  function markTaskComplete(id) {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        // if the task id matches the id of the task to be updated
        return {
          id: task.id,
          description: task.description,
          completed: !task.completed,
        };
      } else {
        return task; // keep other tasks unchanged
      }
    });

    // update the tasks state with the new list
    setTasks(updatedTasks);
  }

  // function to add a new task to the list
  function addTask() {
    if (newTask !== "") {
      let newTaskObj = {
        id: Math.random().toString(), // generate a unique id
        description: newTask, // set task description
        completed: false, // new tasks arent completed by default
      };

      // update  tasks state by adding  new task
      setTasks(tasks.concat(newTaskObj));
      setNewTask(""); // clear the input field after adding the task
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* list of tasks */}
      <FlatList
        data={tasks} // provide the list of tasks
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            {/* checkbox to mark task as complete */}
            <CheckBox
              checked={item.completed}
              onPress={() => markTaskComplete(item.id)}
            />
            {/* task description with styling to show completed tasks differently */}
            <Text
              style={item.completed ? styles.completedTask : styles.taskText}
            >
              {item.description}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id} // ssign  key to each task
      />

      {/* input field and button to add new tasks */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)} // update when user types
        />
        <Button title="Add Task" onPress={addTask} /> {/* button to add task */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
  },
});
