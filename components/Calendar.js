import { useWindowDimensions } from "react-native";
import { Calendar as ReactCalendar } from "react-native-calendars";

export default function Calendar() {
  const { width } = useWindowDimensions();

  // TODO render dates from AsyncStorage on calendar

  return (
    <ReactCalendar
      style={{
        width: width,
        marginVertical: 50,
      }}
    />
  );
}
