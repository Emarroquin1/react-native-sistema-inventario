import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const Button = ({ onPress, style, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
)

export default function PostCardItem({ nombre, precio_compra, precio_Venta, stock, stock_min, nombre_categoria, nombreProveedor,onEdit,onDelete }) {
console.log(nombre)
  return (
    <Card style={styles.item}>
      <View style={styles.rowView}>
        <View>
          <Text style={styles.title}>Producto: {nombre}</Text>
          <Text></Text>
          <Text style={styles.subTitle}>Detalles</Text>
          <Text></Text>
          <Text>Precio compra: {precio_compra}</Text>
          <Text>Precio venta: {precio_Venta}</Text>
          <Text>Cantidad: {stock}</Text>
          <Text>Cantidad minima: {stock_min}</Text>
          <Text>Categoria: {nombre_categoria}</Text>
          <Text>Proveedor: {nombreProveedor}</Text>
          
        </View>
      </View>
      <View style={styles.rowViewButton}>
      <Button
            onPress={onEdit}
            icon="edit"
            style={{ marginHorizontal: 5 }} />
          <Button onPress={onDelete} style={{ marginHorizontal: 5 }}   icon='trash-2' />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowViewButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle:{
    fontSize: 15,
  },
  item: {
    padding: 40,
    margin: 5,
    elevation: 4,
    borderRadius: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})