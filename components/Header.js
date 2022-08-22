import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

export default function Header() {
  const { height } = useWindowDimensions();

  return (
    <View style={{ ...styles.container, height: height * 0.2 }}>
      <Text style={styles.headerText}>Cycle Tracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#354e78",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
  },
});