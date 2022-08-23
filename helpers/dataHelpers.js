import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveData = async (itemName) => {
  let value = null;
  try {
    value = await AsyncStorage.getItem(itemName);
    if (value !== null) {
      value = JSON.parse(value);
    }
  } catch (error) {
    console.log(`Could not retrieve data: ${error}`);
  }
  return value;
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(`Could not store data: ${error}`);
  }
};
