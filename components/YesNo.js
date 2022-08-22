import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function YesNo(props) {
  const {
    cycleData, // object
    date, // string
    label, // string
    onUpdateCycleData, // function
  } = props;

  const [selectedOption, setSelectedOption] = useState(""); // "y", "n", ""
  const colors = {
    dark: "#354e78",
    light: "#f4f4f4",
  };
  console.log("selectedOption", selectedOption);
  const handlePress = (selected) => {
    console.log("button", selected);
    if (selectedOption === selected) {
      // clear selectedOption if same option was re-selected
      setSelectedOption("");
    } else {
      setSelectedOption(selected);
    }
  };

  useEffect(() => {
    console.log("date changed", date, cycleData[date]);
    if (!!date && cycleData[date]) {
      setSelectedOption(cycleData[date]);
    }
  }, [cycleData[date]]);

  useEffect(() => {
    if (!!date) {
      onUpdateCycleData(selectedOption);
    }
  }, [selectedOption]);

  const renderButton = (title, value) => {
    return (
      <Pressable
        style={{
          ...styles.button,
          backgroundColor:
            selectedOption === value ? colors.dark : colors.light,
        }}
        onPress={() => handlePress(value)}
      >
        <Text
          style={{
            ...styles.text,
            color: selectedOption === value ? colors.light : colors.dark,
          }}
        >
          {title}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, marginVertical: 12 }}>{label}</Text>
      <View style={styles.row}>
        {renderButton("No", "n")}
        {renderButton("Yes", "y")}
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 12,
  },
  text: {
    fontSize: 16,
  },
});
