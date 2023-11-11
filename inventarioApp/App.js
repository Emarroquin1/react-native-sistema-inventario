import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Inicio } from "./src/screen/Inicio";
import categoriaCRUD from './src/screen/categoria';
import ProductoCRUD from './src/screen/producto';
import Login from './src/screen/LoginScreen';

import MiCuenta from './src/screen/Micuenta';

import Registrar from './src/screen/SignupScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import app from './database/firebase';
import { getAuth, onAuthStateChanged, signOut, initializeAuth, getReactNativePersistence } from 'firebase/auth';


const Menu = createDrawerNavigator();

const Stack = createNativeStackNavigator();
const auth = getAuth(app);



const App = () => {

 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
 
    });

    return () => {
      unsubscribe();
    };
  }, []);
 
  return (
    <NavigationContainer>
      <Menu.Navigator>
        <Menu.Screen
          name="INICIO"
          options={{
            headerTitle: "INICIO",
          }}
          component={Inicio}
        />

        {user ? (
          // El usuario está autenticado, muestra otras opciones
          <>

         

            <Menu.Screen name="CATEGORIAS" component={categoriaCRUD} />
            <Menu.Screen name="PRODUCTOS" component={ProductoCRUD} />
            <Menu.Screen
              component={MiCuenta}
              name="MI CUENTA"
              options={{
                title: "MI CUENTA",
              }}
            />

          </>
        ) : ( 
          // El usuario no está autenticado, muestra opciones de inicio de sesión y registro
          <>
            <Menu.Screen name="LOGIN" component={Login} />
            <Stack.Screen name="REGISTRAR" component={Registrar} />
          </>
        )}
      </Menu.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
