import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./components/Header";
import Calendar from "./components/Calendar";
import YesNo from "./components/YesNo";

import { retrieveData, storeData } from "./helpers/dataHelpers";

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

  useEffect(() => {
    const date = new Date();
    const [year, month, day] = [
      date.getFullYear().toString(),
      date.getMonth().toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0"),
    ];
    setCurrentDate(`${year}-${month}-${day}`);
    initCycleData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContent}>
        <Calendar cycleData={Object.keys(cycleData)} />
        <YesNo
          cycleData={cycleData}
          date={currentDate}
          label={currentDate}
          onUpdateCycleData={handleUpdateCycleData}
        />
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
