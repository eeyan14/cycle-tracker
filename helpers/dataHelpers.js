import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveData = async (itemName) => {
  let value = null;
  try {
    value = await AsyncStorage.getItem(itemName);
    if (value !== null) {
      console.log(`Data found: ${value}`);
      value = JSON.parse(value);
    } else {
      console.log(`No data found: ${value}`);
    }
  } catch (error) {
    console.log(`Could not retrieve data: ${error}`);
  }
  return value;
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log("Data was stored", key, JSON.stringify(value));
  } catch (error) {
    console.log(`Could not store data: ${error}`);
  }
};
