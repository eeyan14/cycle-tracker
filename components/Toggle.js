import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import drop from "../assets/drop.png";
import dropGray from "../assets/dropGray.png";
import colors from "../helpers/colors";

export default function Toggle(props) {
  const {
    cycleData, // object
    date, // string
    label, // string
    onUpdateCycleData, // function
  } = props;

  const [selectedOption, setSelectedOption] = useState(""); // "y", "n", ""

  const handlePress = (selected) => {
    if (selectedOption === selected) {
      // clear selectedOption if same option was re-selected
      setSelectedOption("");
    } else {
      setSelectedOption(selected);
    }
  };

  useEffect(() => {
    if (!!date) {
      if (cycleData[date]) {
        setSelectedOption(cycleData[date]);
      } else {
        setSelectedOption("");
      }
    }
  }, [cycleData[date]]);

  useEffect(() => {
    if (!!date && cycleData[date] !== selectedOption) {
      onUpdateCycleData(selectedOption);
    }
  }, [selectedOption]);

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, marginVertical: 12 }}>{label}</Text>
      <View style={styles.row}>
        <Pressable
          onPress={() => handlePress("y")}
          style={{
            ...styles.button,
            borderColor: selectedOption === "y" ? colors.main : colors.gray,
          }}
        >
          <Image
            source={selectedOption === "y" ? drop : dropGray}
            style={styles.image}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50, // border radius = 1/2 image height
    borderWidth: 7,
    width: 100,
    height: 100,
  },
  image: {
    height: 100,
    resizeMode: "contain",
  },
});
