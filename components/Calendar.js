import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Calendar as ReactCalendar } from "react-native-calendars";
import colors from "../helpers/colors";

export default function Calendar(props) {
  const {
    cycleData, // object
    onSelectDay, // function
  } = props;

  const { width } = useWindowDimensions();
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    if (!!cycleData && !!Object.keys(cycleData).length) {
      const updatedDates = { ...markedDates };
      for (const [key, value] of Object.entries(cycleData)) {
        const selected = value === "y";
        updatedDates[key] = {
          selected: selected,
          color: selected ? colors.main : colors.white,
          startingDay: true,
          endingDay: true,
        };
      }
      setMarkedDates(updatedDates);
    }
  }, [cycleData]);

  return (
    <ReactCalendar
      markedDates={markedDates}
      markingType={"period"}
      onDayPress={onSelectDay}
      style={{
        width: width,
        marginVertical: 50,
      }}
    />
  );
}
