import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import colors from "../helpers/colors";

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
    backgroundColor: colors.main,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    color: colors.white,
  },
});
