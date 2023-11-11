import { View, Text, Image, SafeAreaView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Registrar from '../../src/screen/SignupScreen';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import * as yup from 'yup'
import app from '../../database/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../CustomAlert';

export default function SignupScreen() {

    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const auth = getAuth(app);
    const saveValueFunction = (email) => {
        AsyncStorage.setItem('email', email);
    };

    const handleLogin = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                saveValueFunction(user.email);
                setAlertMessage(`¡Bienvenido!`);
                setShowAlert(true);
                console.log('Logged in with:', user.email);

            })
            .catch(error => alert(error.message))
    }
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required('El correo electrónico es requerido')
            .matches(
                /@gmail\.com$/,
                'Debe ser una dirección de correo electrónico de Gmail'
            ),
        clave: yup.string().required('La contraseña es requerida'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            clave: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {

            handleLogin(values.email, values.clave)
        },
    });

    const navigation = useNavigation();
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
                        className="text-white font-bold tracking-wider text-5xl">
                        LOGIN
                    </Animated.Text>
                </View>

                {/* form */}
                <View className="flex items-center mx-5 space-y-5  mb-20">
                    <Text></Text>
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        className="rounded-2xl w-full">
                        <TextInput
                            className="bg-white"
                            placeholder="Email"
                            placeholderTextColor={'black'}
                            value={formik.values.email}
                            onChangeText={formik.handleChange('email')}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{formik.errors.email}</Text>
                        )}
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        className="rounded-2xl w-full">
                        <TextInput
                            className="bg-white"
                            placeholder="Contraseña"
                            placeholderTextColor={'black'}
                            value={formik.values.clave}
                            onChangeText={formik.handleChange('clave')}
                            secureTextEntry />
                        {formik.touched.clave && formik.errors.clave && (
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{formik.errors.clave}</Text>
                        )}
                    </Animated.View>

                    <Animated.View className="w-full mb-5" entering={FadeInDown.delay(600).duration(1000).springify()}>
                        <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-5">
                            <Text className="text-xl font-bold text-white text-center" onPress={formik.handleSubmit}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(800).duration(1000).springify()}
                        className="flex-row justify-center  mb-20">

                        <Text>No tienes una cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('REGISTRAR')}>
                    <Text className="text-sky-600">Registrate</Text>
                </TouchableOpacity>



                        <CustomAlert
                            visible={showAlert}
                            message={alertMessage}
                            onClose={() => setShowAlert(false)}
                        />

                    </Animated.View>
                </View>
            </View>
        </View>
    )
}


