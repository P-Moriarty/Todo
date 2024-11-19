import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
// import axios from "axios";
// import messaging from "@react-native-firebase/messaging";
// import notifee from "@notifee/react-native"; // Import Notifee for local notifications

type Task = {
  id: number;
  text: string;
};

const TabTwoScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);





  // useEffect(() => {
  //   const createNotificationChannel = async () => {
  //     await notifee.createChannel({
  //       id: 'default',
  //       name: 'Default Channel',
  //       // importance: notifee.AndroidImportance.HIGH,
  //     });
  //   };
  
  //   createNotificationChannel();
  // }, []);
  
  // // Request permission for notifications on mount
  // useEffect(() => {
  //   const requestUserPermission = async () => {
  //     try {
  //       const authStatus = await messaging().requestPermission();
  //       const enabled =
  //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  //       if (enabled) {
  //         console.log("FCM Authorization status:", authStatus);
  //         const token = await messaging().getToken();
  //         console.log("FCM Token:", token);
  //       }
  //     } catch (error) {
  //       console.error("Permission error:", error);
  //     }
  //   };

  //   requestUserPermission();

  //   // Set up FCM message handling for background/foreground notifications
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('Notification caused app to open from background state:', remoteMessage.notification);
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log('Notification caused app to open from quit state:', remoteMessage.notification);
  //       }
  //     });
  // }, []);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
  //       const fetchedTasks = response.data.slice(0, 10).map((task: any) => ({
  //         id: task.id,
  //         text: task.title,
  //       }));
  //       setTasks(fetchedTasks);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to load tasks.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  // const showNotification = async (title: string, body: string) => {
  //   await notifee.displayNotification({
  //     title,
  //     body,
  //     android: {
  //       channelId: 'default',
  //     },
  //   });
  // };

  const addTask = (taskText: string) => {
    const newTask = { id: Date.now(), text: taskText };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    // showNotification("Task Added", `New task "${taskText}" has been added.`);
  };

  const editTask = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setTaskToEdit(task);
      setNewTaskText(task.text);
      setIsEditing(true);
    }
  };

  const saveEditedTask = () => {
    if (taskToEdit) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskToEdit.id ? { ...task, text: newTaskText } : task
        )
      );
      setIsEditing(false);
      // showNotification("Task Edited", `Task "${newTaskText}" has been edited.`);
      setTaskToEdit(null);
      setNewTaskText("");
    }
  };

  const deleteTask = (taskId: number) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    // if (taskToDelete) {
    //   showNotification("Task Deleted", `Task "${taskToDelete.text}" has been deleted.`);
    // }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#D0D0D0" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/TaskDetails.jpg")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Task Details</ThemedText>
      </ThemedView>
      <ThemedText>This is how you get started.</ThemedText>
      <View style={styles.container}>
        <TaskInput onAddTask={addTask} />
      </View>

      {tasks.length > 0 && (
        <View style={styles.taskListContainer}>
          <TaskList tasks={tasks} onEditTask={editTask} onDeleteTask={deleteTask} />
        </View>
      )}

      {isEditing && (
        <Modal visible={isEditing} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Task</Text>
              <TextInput
                style={styles.modalInput}
                value={newTaskText}
                onChangeText={setNewTaskText}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.saveButton} onPress={saveEditedTask}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  taskListContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  headerImage: {
    height: 298,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },
  modalInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50", 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#FF3B30", 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default TabTwoScreen;
