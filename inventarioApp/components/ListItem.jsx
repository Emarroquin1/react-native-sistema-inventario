import { Text, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

function RightActions() {
  return (
    <TouchableOpacity
      onPress={() => alert("Eliminar")}
      style={{
        backgroundColor: "#ff5f59",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <Text style={{ color: "white" }}>Eliminar</Text>
    </TouchableOpacity>
  );
}

export function ListItem({ text }) {
  return (
    <Swipeable renderRightActions={RightActions}>
      <TouchableOpacity onPress={() => alert("Hola")} style={{ padding: 15 }}>
        <Text>{text}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
}