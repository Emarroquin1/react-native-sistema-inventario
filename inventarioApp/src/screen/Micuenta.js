import { View, Text, Image, SafeAreaView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import * as yup from 'yup'
import app from '../../database/firebase';
import { getAuth, signInWithEmailAndPassword, inMemoryPersistence, setPersistence, signOut, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen() {


    const auth = getAuth(app);

    const [user, setUser] = useState('');


    const handleSignOut = () => {
        console.log('Sign out');
        signOut(auth)
        AsyncStorage.clear()
            .then(() => {
                // Redirige al usuario a la pantalla de inicio de sesión
            })
            .catch(error => alert(error.message));
    };


    const navigation = useNavigation();

    const getValueFunction = () => {
        AsyncStorage.getItem('email').then(
        (value) =>
        setUser(value)
        
        );
        };

        
    useEffect(() => {

        getValueFunction();
    }, []);
        return (
        <View className="bg-green h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={require('../../assets/images/background.png')} />

            {/* lights */}
            <View className="flex-row justify-around w-full absolute">
                <Animated.Image
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    source={require('../../assets/images/light.png')}
                    className="h-[170] w-[90]"
                />
                <Animated.Image
                    entering={FadeInUp.delay(400).duration(1000).springify()}
                    source={require('../../assets/images/light.png')}
                    className="h-[160] w-[65] opacity-75"
                />
            </View>

            {/* title and form */}
            <View className="h-full w-full flex justify-around pt-50 ">

                {/* title */}
                <View className="flex items-center">
                    <Animated.Text 
                        entering={FadeInUp.duration(1000).springify()}
                        className="mt-20 text-white font-bold tracking-wider text-5xl">
                        MI CUENTA
                    </Animated.Text>
                </View>

                {/* form */}
                <View className="flex items-center mx-5 space-y-5  mb-10 bg-black rounded-2xl">
                    <Text></Text>
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        className="bg-black rounded-2xl w-full">

                        <Text style={{ fontSize: 25, color: '#00E8FF',  textAlign:'center'}}>Correo: {user}</Text>

                    </Animated.View>

                    <Animated.View className="w-full mb-2 bg-red" entering={FadeInDown.delay(600).duration(1000).springify()}>
                        <TouchableOpacity className="w-full bg-red-400 p-3 rounded-2xl mb-5">
                            <Text className="text-xl font-bold text-white text-center" onPress={handleSignOut}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </Animated.View>


                </View>
            </View>
        </View>
    )
}


