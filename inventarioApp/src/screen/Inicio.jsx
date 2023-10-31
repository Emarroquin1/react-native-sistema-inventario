import { FlatList, Text, StyleSheet, View, Image } from "react-native";
import { useState } from "react";
import { ListItem } from "../../components/ListItem";

function Separator() {
  return (
    <View style={{ width: "100%", height: 1, backgroundColor: "#0CFFDE" }} />
  );
}

export function Inicio() {

  return (
    <View>

      <Text style={styles.title}>Bienvenido estimado usuario.</Text>

      <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={require('../sistemaInventarioLogo.png')} // Reemplaza con la ruta de tu imagen
      />
    </View>
    
      <Text style={styles.Text}>
        Nos complace darle la bienvenida a nuestro Sistema de Gestión de Categorías y Productos,
        la solución integral para simplificar y optimizar la gestión de productos en su negocio.
        Este sistema ha sido diseñado pensando en la eficiencia y la facilidad de uso, con el objetivo de ayudarle a
        organizar y mantener un control detallado de sus productos y categorías en un solo lugar.
      </Text>
      <Text style={styles.Text}>
        Nuestro sistema le ofrece las herramientas necesarias para clasificar y organizar sus productos en categorías personalizadas,
        lo que facilita la navegación y la búsqueda de información. Además, podrá gestionar y actualizar de manera sencilla todos los datos
        relevantes de sus productos, incluyendo descripciones, precios, cantidades en inventario y más.
      </Text>
    </View>



  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 20, // Elige el tamaño de fuente deseado
    fontWeight: 'bold', // Hace que el texto sea negrita
    marginBottom: 10, // Opcional, agrega un espacio debajo del título
  },
  Text: {
    marginTop: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 15, // Elige el tamaño de fuente deseado para el texto principal
  },
  image: {
    width: 200, // Ancho de la imagen
    height: 200, // Alto de la imagen
    resizeMode: 'contain', // Puedes ajustar cómo la imagen se adapta al tamaño
    marginBottom: 20, // Espacio entre la imagen y el texto
  },  imageContainer: {
    alignItems: 'center', // Centra horizontalmente
    justifyContent: 'center', // Centra verticalmente
  },
});
