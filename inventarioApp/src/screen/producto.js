//Importamos Axios en nuestro código
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { Surface, Title, TextInput } from 'react-native-paper';
import { StatusBar, } from 'expo-status-bar';
import ModalView from '../../components/ModalView';
import ProductoCardItem from '../../components/ProductoCardItem';
import { Dropdown } from 'react-native-element-dropdown';
import * as Yup from 'yup'

import { useFormik } from 'formik';


export default function ListUser({ navigation }) {

    const [ProductoList, setProductoList] = useState([]);

    const [proveedores, setProveedores] = useState([]);

    const [categoriaList, setCateList] = useState([]);

    const [isFocusProveedor, setIsFocusProveedor] = useState(false);
    const [isFocusCategoria, setIsFocusCategoria] = useState(false);

    const [visible, setVisible] = useState(false);

 
    const [ProductosID, setProductosID] = useState(0);
    let [loading, setLoading] = useState(true);


    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        precioCompra: Yup.number()
            .test('is-decimal', 'El precio de compra debe ser un número válido', (value) => {
                if (value === undefined || value === null) {
                    return true;
                }
                return /^[+]?\d+(\.\d+)?$/.test(value);
            })
            .positive('El precio de compra debe ser mayor que cero')
            .required('El precio de compra es obligatorio'),

        precioVenta: Yup.number()
            .test('is-decimal', 'El precio de venta debe ser un número válido', (value) => {
                if (value === undefined || value === null) {
                    return true;
                }
                return /^[+]?\d+(\.\d+)?$/.test(value);
            })
            .positive('El precio de venta debe ser mayor que cero')
            .required('El precio de venta es obligatorio'),
        stock: Yup.number()
            .required('El stock es obligatorio')
            .test('is-not-negative', 'El stock debe ser un número no negativo', value => value >= 0),
        stockMin: Yup.number()
            .required('El stock mínimo es obligatorio')
            .test('is-not-negative', 'El stock mínimo debe ser un número no negativo', value => value >= 0),
        ProveedoresID: Yup.number().required('El proveedor es obligatorio'),
        categoriasID: Yup.number().required('La categoría es obligatoria'),
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            precioCompra: '',
            precioVenta: '',
            stock: '',
            stockMin: '',
            ProveedoresID: '',
            categoriasID: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            console.log('entro');
            console.log(values,ProductosID)
            if (ProductosID) {
                editProducto(
                    ProductosID,
                    values.nombre,
                    values.precioCompra,
                    values.precioVenta,
                    values.stock,
                    values.stockMin,
                    values.ProveedoresID,
                    values.categoriasID
                );
            } else {
                // Si no, agregar producto
                addProducto(values.nombre,
                    values.precioCompra,
                    values.precioVenta,
                    values.stock,
                    values.stockMin,
                    values.ProveedoresID,
                    values.categoriasID);
            }

        },
    });

    const edit = (id, nombre_Producto, precio_compra, precio_venta, stock, stock_min, ProveedoresID, categoriasID) => {
        setVisible(true);
        setProductosID(id);
        formik.setValues({
            nombre: nombre_Producto,
            precioCompra: precio_compra.toString(), // Asegura que sea una cadena
            precioVenta: precio_venta.toString(),
            stock: stock.toString(),
            stockMin: stock_min.toString(),
            ProveedoresID: ProveedoresID,
            categoriasID: categoriasID,
        });
    }


    const url = 'https://apiinventarioproyecto.000webhostapp.com'

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const getProductos = async () => {
        setLoading(true);
        await fetch(url + '/api/productoVista/select')
            .then((res) => res.json())
            .then((res) => {
                setProductoList(res.data);
            })
        //    .catch(e => console.log(e))
        setLoading(false)
    }

    const getProveedores = async () => {
        setLoading(true);
      //  console.log('cargando proveedores');
        await fetch(url + '/api/proveedor/select')
            .then((res) => res.json())
            .then((res) => {

                setProveedores(res.data);
             //   console.log(proveedores);
            })
        //    .catch(e => console.log(e))
        setLoading(false)
    }

    const getCategorias = async () => {

        await fetch(url + '/api/categoria/select')
            .then((res) => res.json())
            .then((res) => {
                setCateList(res.data);
            })
         //   .catch(e => console.log(e))
        setLoading(false)
    }



    const addProducto = (
        nombre,
        precioCompra,
        precioVenta,
        stock,
        stockMin,
        ProveedoresID,
        categoriasID
    ) => {
        setLoading(true);
        const data = {
            nombre: nombre,
            precio_compra: precioCompra,
            precio_venta: precioVenta,
            stock: stock,
            stock_min: stockMin,
            ProveedoresID: ProveedoresID,
            categoriasID: categoriasID,
            activo: true,
        };

        fetch(url + '/api/producto/store', {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log('Producto Almacenado correctamente:', resJson);
                updateProducto();
            })
            .catch((e) => {
                console.log(e);
            });
    };



    const deleteProducto = (ProductosID) => {

        setLoading(true);
        fetch(url + "/api/producto/delete/" + ProductosID, {
            method: "POST",
            headers,
        }).then((res) => res.json())
            .then(resJson => {
                console.log('delete:', resJson)
                updateProducto();
            }).catch(e => { console.log(e) })
    }

    const editProducto = (
        ProductosID,
        nombre,
        precioCompra,
        precioVenta,
        stock,
        stockMin,
        ProveedoresID,
        categoriasID
    ) => {
        setLoading(true);
        const data = {
            nombre: nombre,
            precio_compra: precioCompra,
            precio_venta: precioVenta,
            stock: stock,
            stock_min: stockMin,
            ProveedoresID: ProveedoresID,
            categoriasID: categoriasID,
            activo: true,
        };

        setLoading(true);
        fetch(url + "/api/producto/update/" + ProductosID, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        }).then((res) => res.json())
            .then(resJson => {
                console.log('actualizada:', resJson)
                updateProducto()
            }).catch(e => { console.log(e) })
    }

    const updateProducto = () => {
        getProductos()
        setLoading(false);
        setVisible(false);
        setProductosID(0)
    }



    useEffect(() => {

        getProductos();
        getProveedores();
        getCategorias();
    }, []);
    if (loading) {
        return <ActivityIndicator size="large" />;
    } else {
        return (

            <SafeAreaView style={styles.container}>

                <StatusBar style="auto" />
                <Surface style={styles.header}>
                    <Title>Productos</Title>
                    <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                        <Text style={styles.buttonText}>Agregar</Text>
                    </TouchableOpacity>
                </Surface>

                <FlatList
                    data={ProductoList}
                    keyExtractor={(item, index) => item.productosID.toString()} // Utiliza ProductosID como la clave
                    refreshing={loading}
                    onRefresh={getProductos}
                    renderItem={({ item }) => (
                        <ProductoCardItem
                            nombre={item.nombre}
                            precio_compra={item.precio_compra}
                            precio_Venta={item.precio_venta}
                            stock={item.stock}
                            stock_min={item.stock_min}
                            nombreProveedor={item.nombreProveedor}
                            nombre_categoria={item.nombre_categoria}
                            onEdit={() => edit(
                                item.productosID,
                                item.nombre,
                                item.precio_compra,
                                item.precio_venta, // Agrega el precio de venta
                                item.stock, // Agrega el stock
                                item.stock_min, // Agrega el stock mínimo
                                item.ProveedoresID, // Agrega el ID del proveedor
                                item.categoriasID // Agrega el ID de la categoría
                            )}

                            onDelete={() => deleteProducto(item.productosID)}
                        />

                    )}


                />


                <ModalView
                    visible={visible}
                    title="Agregar Producto"
                    onDismiss={() => setVisible(false)}
                    formik={formik}
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

                    <TextInput
                        style={styles.TextInputChildren}
                        label="Precio de compra"
                        value={formik.values.precioCompra.toString()}
                        onChangeText={formik.handleChange('precioCompra')}
                        onBlur={formik.handleBlur('precioCompra')}

                    />
                    {formik.touched.precioCompra && formik.errors.precioCompra && (
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{formik.errors.precioCompra}</Text>
                    )}

                    <TextInput
                        style={styles.TextInputChildren}
                        label="Precio de venta"
                        value={formik.values.precioVenta.toString()}
                        onChangeText={formik.handleChange('precioVenta')}
                        onBlur={formik.handleBlur('precioVenta')}

                    />
                    {formik.touched.precioVenta && formik.errors.precioVenta && (
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{formik.errors.precioVenta}</Text>
                    )}

                    <TextInput
                        style={styles.TextInputChildren}
                        label="Stock"
                        value={formik.values.stock.toString()}
                        onChangeText={formik.handleChange('stock')}
                        onBlur={formik.handleBlur('stock')}

                    />
                    {formik.touched.stock && formik.errors.stock && (
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{formik.errors.stock}</Text>
                    )}

                    <TextInput
                        style={styles.TextInputChildren}
                        label="Stock mínimo"
                        value={formik.values.stockMin.toString()}
                        onChangeText={formik.handleChange('stockMin')}
                        onBlur={formik.handleBlur('stockMin')}

                    />
                    {formik.touched.stockMin && formik.errors.stockMin && (
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{formik.errors.stockMin}</Text>
                    )}


                    <Dropdown
                        style={[styles.dropdown, isFocusProveedor && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={proveedores}
                        search
                        maxHeight={300}
                        labelField="nombre"
                        valueField="ProveedoresID"
                        placeholder={!isFocusProveedor ? 'Seleccione el proveedor' : '...'}
                        searchPlaceholder="Buscar..."
                        value={formik.values.ProveedoresID}
                        onFocus={() => setIsFocusProveedor(true)}
                        onBlur={() => setIsFocusProveedor(false)}
                        onChange={item => {
                            formik.setFieldValue('ProveedoresID', item.ProveedoresID);
                        }}
                    />
                    {formik.touched.ProveedoresID && formik.errors.ProveedoresID && (
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{formik.errors.ProveedoresID}</Text>
                    )}
                    <Dropdown
                        style={[styles.dropdown, isFocusCategoria && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={categoriaList}
                        search
                        maxHeight={300}
                        labelField="nombre_categoria"
                        valueField="categoriasID"
                        placeholder={!isFocusCategoria ? 'Seleccione la categoria' : '...'}
                        searchPlaceholder="Buscar..."
                        value={formik.values.categoriasID}
                        onFocus={() => setIsFocusCategoria(true)}
                        onBlur={() => setIsFocusCategoria(false)}
                        onChange={item => {
                            formik.setFieldValue('categoriasID', item.categoriasID);
                        }}
                    />
                    {formik.touched.categoriasID && formik.errors.categoriasID && (
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{formik.errors.categoriasID}</Text>
                    )}

                </ModalView>



            </SafeAreaView >

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

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        marginTop: 10
    },


    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 15,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    TextInputChildren: {

        color: 'white',
        backgroundColor: 'white',
        marginTop: 10,
    },
});