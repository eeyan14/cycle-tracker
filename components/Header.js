import { Image, View } from "react-native";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={logo}
        style={{
          height: 50,
          resizeMode: "contain",
          marginVertical: 20,
        }}
      />
    </View>
  );
}
