import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Toggle from "./components/Toggle";

import { retrieveData, storeData } from "./helpers/dataHelpers";
import {
  createRecurringNotification,
  cancelNotifications,
} from "./helpers/notifications";
import colors from "./helpers/colors";

export default function App() {
  /*
    Cycle data is stored as an object, where the keys are dates in format
    "YYYY-MM-DD", and values are one of ["y", "n", ""].
  */
  const STORAGE_KEY = "CycleData";
  const [cycleData, setCycleData] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  const initCycleData = async () => {
    try {
      const storedData = await retrieveData(STORAGE_KEY);
      if (!!storedData && Object.keys(storedData).some((key) => !!key)) {
        setCycleData(storedData);
      }
    } catch (error) {
      console.log("Could not init cycle data");
    }
  };

  const handleUpdateCycleData = (value) => {
    const updatedData = { ...cycleData, [currentDate]: value };
    setCycleData(updatedData);
    storeData(STORAGE_KEY, updatedData);
  };

  const handleSelectDay = (day) => {
    setCurrentDate(day.dateString);
  };

  useEffect(() => {
    const date = new Date();
    const [year, month, day] = [
      date.getFullYear().toString(),
      (date.getMonth() + 1).toString().padStart(2, "0"), // months are 0-indexed
      date.getDate().toString().padStart(2, "0"),
    ];
    setCurrentDate(`${year}-${month}-${day}`);
    initCycleData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Calendar cycleData={cycleData} onSelectDay={handleSelectDay} />
        <Toggle
          cycleData={cycleData}
          date={currentDate}
          label={currentDate}
          onUpdateCycleData={handleUpdateCycleData}
        />

        {/* Debugging elements */}
        <Pressable
          onPress={() =>
            createRecurringNotification(
              "Checking in",
              "Log your cycle today",
              new Date(),
              true
            )
          }
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginVertical: 10,
            backgroundColor: colors.main,
          }}
        >
          <Text style={{ color: colors.white }}>Create notification</Text>
        </Pressable>

        <Pressable
          onPress={() => cancelNotifications()}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginVertical: 10,
            backgroundColor: colors.main,
          }}
        >
          <Text style={{ color: colors.white }}>Cancel notifications</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
