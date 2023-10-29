//Importamos Axios en nuestro código
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { Surface, Title, TextInput } from 'react-native-paper';
import { StatusBar, } from 'expo-status-bar';
import ModalView from '../../components/ModalView';
import CategoriaCardItem from '../../components/CategoriaCardItem';
import * as yup from 'yup'

import { useFormik } from 'formik';

export default function ListUser({ navigation }) {

    const [categoriaList, setCateList] = useState([]);

    const [visible, setVisible] = useState(false);
    const [categoriasID, setCategoriaId] = useState(0);
    let [loading, setLoading] = useState(true);

    const validationSchema = yup.object().shape({
        nombre: yup.string().required('Nombre es requerido'),
        descripcion: yup.string().required('Descripción es requerida'),
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            descripcion: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
         
            if (categoriasID) {
             
                editCategoria(categoriasID, values.nombre, values.descripcion);
            } else {
    
                addCategoria(values.nombre, values.descripcion);
            }
        },
    });

    const edit = (id, nombre_categoria, descripcion) => {
        setVisible(true)
        formik.setValues({
            nombre: nombre_categoria,
            descripcion: descripcion,
        });
        setCategoriaId(id)
    }

    const url = 'https://apiinventarioproyecto.000webhostapp.com'

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };



    const addCategoria = (nombre_categoria, descripcion) => {

        setLoading(true)
        fetch(url + '/api/categoria/store', {
            method: "POST",
            headers,
            body: JSON.stringify({
                "nombre_categoria": nombre_categoria,
                "descripcion": descripcion,
                "activo": true
            })
        }).then((res) => res.json())
            .then(resJson => {
                console.log('Categoria Almacenda correctamente:', resJson)
                updateCategoria()
            }).catch(e => { console.log(e) })
    }

    const getCategorias = async () => {

        await fetch(url + '/api/categoria/select')
            .then((res) => res.json())
            .then((res) => {
                setCateList(res.data);
            })
            .catch(e => console.log(e))
        setLoading(false)
    }


    const deleteCategoria = (categoriasID) => {

        setLoading(true);
        fetch(url + "/api/categoria/delete/" + categoriasID, {
            method: "POST",
            headers,
        }).then((res) => res.json())
            .then(resJson => {
                console.log('delete:', resJson)
                updateCategoria();
            }).catch(e => { console.log(e) })
    }

    const editCategoria = (categoriasID, nombre_categoria, descripcion) => {
        setLoading(true);
        fetch(url + "/api/categoria/update/" + categoriasID, {
            method: "POST",
            headers,
            body: JSON.stringify({
                "nombre_categoria": nombre_categoria,
                "descripcion": descripcion,
                "activo": true
            })
        }).then((res) => res.json())
            .then(resJson => {
                console.log('actualizada:', resJson)
                updateCategoria()
            }).catch(e => { console.log(e) })
    }

    const updateCategoria = () => {
        getCategorias()
        setLoading(false);
        setVisible(false);
        formik.setValues({
            nombre: '',
            descripcion: '',
        });
        setCategoriaId(0)
    }

    useEffect(() => {

        getCategorias();
    }, []);
    if (loading) {
        return <ActivityIndicator size="large" />;
    } else {
        return (

            <SafeAreaView style={styles.container}>

                <StatusBar style="auto" />
                <Surface style={styles.header}>
                    <Title>CATEGORIAS</Title>
                    <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                        <Text style={styles.buttonText}>Agregar</Text>
                    </TouchableOpacity>
                </Surface>

                <FlatList
                    data={categoriaList}
                    keyExtractor={(item, index) => item.categoriasID.toString()} // Utiliza categoriasID como la clave
                    refreshing={loading}
                    onRefresh={getCategorias}
                    renderItem={({ item }) => (
                        <CategoriaCardItem
                            nombre={item.nombre_categoria}
                            descripcion={item.descripcion}
                            onEdit={() => edit(item.categoriasID, item.nombre_categoria, item.descripcion)}
                            onDelete={() => deleteCategoria(item.categoriasID)}
                        />
                    )}
                />

                <ModalView


                    visible={visible}
                    title="Agregar Categoria"
                    formik={formik}
                    onDismiss={() => setVisible(false)}
                    cancelable>
                    <TextInput
                    style={styles.TextInputChildren}
                        label="Nombre"
                        value={formik.values.nombre}
                        onChangeText={formik.handleChange('nombre')}

                    />
                    {formik.touched.nombre && formik.errors.nombre && (
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{formik.errors.nombre}</Text>
                    )}
                    <Text></Text>
                    <TextInput  
                       style={styles.TextInputChildren}
                        label="Descripción"
                        value={formik.values.descripcion}
                        onChangeText={formik.handleChange('descripcion')}

                    />
                    {formik.touched.descripcion && formik.errors.descripcion && (
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{formik.errors.descripcion}</Text>
                    )}

                </ModalView>


            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    header: {
        marginTop: Platform.OS === 'android' ? 24 : 0,
        padding: 16,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'steelblue',
    },
    buttonText: {
        color: 'white'
    },
    TextInputChildren: {
        color: '#0087FF',
        backgroundColor: 'white'
    },
});