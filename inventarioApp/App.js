import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";


import "react-native-gesture-handler";

import { Inicio } from "./src/screen/Inicio";
import categoriaCRUD from './src/screen/categoria';
import ProductoCRUD from './src/screen/producto';
import Login from './src/screen/LoginScreen';
import Registrar from './src/screen/SignupScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Menu = createDrawerNavigator();

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Menu.Navigator>
        <Menu.Screen
          name="Inicio"
          options={{
            headerTitle: "INICIO",
          }}
          component={Inicio}
        />
        <Menu.Screen name="CATEGORIAS" component={categoriaCRUD} />
        <Menu.Screen name="LOGIN" component={Login} />
        <Stack.Screen name="REGISTRAR" component={Registrar} />
        <Menu.Screen name="PRODUCTOS" component={ProductoCRUD} />
      </Menu.Navigator>
    </NavigationContainer>
  );
}