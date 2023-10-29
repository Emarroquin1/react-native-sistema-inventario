import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { Surface, Title, TextInput } from 'react-native-paper';
import * as yup from 'yup';


const ModalView = ({children,formik, title, cancelable, visible = false, onDismiss, submitText = "Aceptar" }) => {
   


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onDismiss={onDismiss}
        >

            <View style={styles.centeredView}>

                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{title}</Text>

                    <View>
                        {children}
                    </View>
                    <View style={{ alignSelf: 'flex-end', alignItems: 'center', flexDirection: 'row', }}>
                        {cancelable && (<TouchableOpacity
                            style={{ ...styles.button, backgroundColor: 'white' }}
                            onPress={onDismiss}>
                            <Text style={[styles.textStyle, { color: '#009EFF' }]}>Cerrar</Text>
                        </TouchableOpacity>)}
                      
                        {(<TouchableOpacity
                            style={styles.button}
                            onPress={formik.handleSubmit}>
                            <Text style={styles.textStyle}>{submitText}</Text>
                        </TouchableOpacity>)}
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // marginHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalView: {
        margin: 30,
        backgroundColor: "#00305B",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 1,
        paddingHorizontal: 20,
        marginTop: 20,
        backgroundColor: '#009EFF',
        marginLeft: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 8,
        fontSize: 20,
        textAlign: "center",
        color: "white",
    }
});

export default ModalView;
